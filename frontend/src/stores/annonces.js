import { defineStore } from 'pinia'
import { ref } from 'vue'
import { annonceService } from '../services/api'
//test
export const useAnnoncesStore = defineStore('annonces', () => {
  const annonces = ref([])
  const mesAnnonces = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Charge toutes les annonces validées
  async function fetchAnnonces() {
    loading.value = true
    error.value = null
    try {
      const response = await annonceService.getAnnonces()
      annonces.value = response.data
    } catch (err) {
      error.value = 'Erreur lors du chargement des annonces'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Charge les annonces du vendeur connecté
  async function fetchMesAnnonces() {
    loading.value = true
    try {
      const response = await annonceService.getMesAnnonces()
      mesAnnonces.value = response.data
    } catch (err) {
      error.value = 'Erreur lors du chargement de vos annonces'
    } finally {
      loading.value = false
    }
  }

  // Crée une nouvelle annonce
  async function creerAnnonce(annonce) {
    loading.value = true
    try {
      const response = await annonceService.creerAnnonce(annonce)
      mesAnnonces.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = 'Erreur lors de la création de l\'annonce'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    annonces,
    mesAnnonces,
    loading,
    error,
    fetchAnnonces,
    fetchMesAnnonces,
    creerAnnonce
  }
})