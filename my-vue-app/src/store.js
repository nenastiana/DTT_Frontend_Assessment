import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    favoriteHouses: new Set(JSON.parse(localStorage.getItem('favoriteHouses'))) || new Set(),
    viewedHouses: new Set(JSON.parse(localStorage.getItem('viewedHouses'))) || new Set(),
    housesData: null,
    selectedHouse: null,
    searchQuery: '',
    sortOrder: null,
    showModal: false,
    currentHouseId: null
  },
  mutations: {
    SET_HOUSES_DATA(state, data) {
      state.housesData = data;
    },
    DELETE_HOUSE(state, id) {
      state.housesData = state.housesData.filter((house) => house.id !== id);
      state.selectedHouse = null;
    },
    SET_SELECTED_HOUSE(state, houses) {
      state.selectedHouse = houses[0];
    },
    UPDATE_HOUSE_IMAGE(state, imageUrl) {
      if (state.house) {
        state.house.imageUrl = imageUrl;
      }
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_SEARCH_ORDER(state, order) {
      state.sortOrder = order;
    },
    OPEN_MODAL(state, houseId) {
      state.showModal = true;
      state.currentHouseId = houseId;
    },
    CLOSE_MODAL(state) {
      state.showModal = false;
      state.currentHouseId = null;
    },
    ADD_TO_FAVORITES(state, houseId) {
      state.favoriteHouses.add(houseId);
      localStorage.setItem('favoriteHouses', JSON.stringify(Array.from(state.favoriteHouses)));
    },
    REMOVE_FROM_FAVORITES(state, houseId) {
      state.favoriteHouses.delete(houseId);
      localStorage.setItem('favoriteHouses', JSON.stringify(Array.from(state.favoriteHouses)));
    },
    ADD_VIEWED_HOUSE(state, houseId) {
      state.viewedHouses.add(houseId);
      localStorage.setItem('viewedHouses', JSON.stringify(Array.from(state.viewedHouses)));
    }
  },
  actions: {
    async fetchHousesData({ commit }) {
      try {
        const response = await axios.get('https://api.intern.d-tt.nl/api/houses', {
          headers: { 'X-Api-Key': 'Tm8iDoF0eA5jwzEBq3cQu47I2s-fWlpr' }
        });
        commit('SET_HOUSES_DATA', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
    async deleteHouse({ commit }, id) {
      try {
        await axios.delete(`https://api.intern.d-tt.nl/api/houses/${id}`, {
          headers: { 'X-Api-Key': 'Tm8iDoF0eA5jwzEBq3cQu47I2s-fWlpr' }
        });
        commit('DELETE_HOUSE', id);
      } catch (error) {
        console.error('Error deleting house:', error);
        throw error;
      }
    },
    async fetchHouseById({ commit }, id) {
      try {
        const response = await axios.get(`https://api.intern.d-tt.nl/api/houses/${id}`, {
          headers: { 'X-Api-Key': 'Tm8iDoF0eA5jwzEBq3cQu47I2s-fWlpr' }
        });
        commit('SET_SELECTED_HOUSE', response.data);
      } catch (error) {
        console.error('Error fetching house by ID:', error);
        throw error;
      }
    },
    async updateHouse({ dispatch }, payload) {
      try {
        const response = await axios.post(
          `https://api.intern.d-tt.nl/api/houses/${payload.id}`,
          payload.houseForm,
          {
            headers: { 'X-Api-Key': 'Tm8iDoF0eA5jwzEBq3cQu47I2s-fWlpr' }
          }
        );
        if (payload.imageFile) {
          await dispatch('uploadImage', { imageFile: payload.imageFile, id: payload.id });
        }
        return response;
      } catch (error) {
        console.error('Error saving changes:', error);
        throw error;
      }
    },

    async createHouse({ dispatch }, payload) {
      let id = null;
      try {
        const response = await axios.post(
          'https://api.intern.d-tt.nl/api/houses',
          payload.houseForm,
          {
            headers: { 'X-Api-Key': 'Tm8iDoF0eA5jwzEBq3cQu47I2s-fWlpr' }
          }
        );
        id = response.data.id;
        await dispatch('uploadImage', { imageFile: payload.imageFile, id: id });
        return id;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    },

    async uploadImage({ commit }, imageUploadData) {
      try {
        const response = await axios.post(
          `https://api.intern.d-tt.nl/api/houses/${imageUploadData.id}/upload`,
          imageUploadData.imageFile,
          {
            headers: {
              'X-Api-Key': 'Tm8iDoF0eA5jwzEBq3cQu47I2s-fWlpr',
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        commit('UPDATE_HOUSE_IMAGE', response.data.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    },
    setSortOrder({ commit }, order) {
      commit('SET_SEARCH_ORDER', order);
    },
    openModal({ commit }, houseId) {
      commit('OPEN_MODAL', houseId);
    },
    addToFavorites({ commit }, houseId) {
      commit('ADD_TO_FAVORITES', houseId);
    },
    removeFromFavorites({ commit }, houseId) {
      commit('REMOVE_FROM_FAVORITES', houseId);
    },
    addToViewed({ commit }, houseId) {
      commit('ADD_VIEWED_HOUSE', houseId);
    }
  },
  getters: {
    housesData(state) {
      return state.housesData;
    },
    getHouseById: (state) => (id) => {
      return state.housesData.find((house) => house.id === id);
    },
    selectedHouse(state) {
      return state.selectedHouse;
    },
    showModal: (state) => state.showModal,
    searchQuery: (state) => state.searchQuery,
    sortOrder: (state) => state.sortOrder,
    filteredHouses(state) {
      let filtered = [];

      if (state.housesData !== null) {
        filtered = state.housesData.slice();

        if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase();
          filtered = filtered.filter((house) => {
            return (
              house.location.houseNumber.toString().includes(query) ||
              house.location.street.toLowerCase().includes(query) ||
              house.location.city.toLowerCase().includes(query) ||
              house.price.toString().includes(query) ||
              house.size.toString().includes(query)
            );
          });
        }

        if (state.sortOrder === 'price') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (state.sortOrder === 'size') {
          filtered.sort((a, b) => a.size - b.size);
        }
      }

      return filtered;
    },
    resultsCount(state, getters) {
      return getters.filteredHouses.length;
    }
  }
});
