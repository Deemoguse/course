import { computed } from 'vue'
import { useStore } from 'vuex'

export function useGetStatus (alias) {
  const statusList = useStore().state.staticData.statusList
  const statusTitle = computed(() => {
    return statusList.find(obj => obj.alias === alias).title
  })
  const statusClass = computed(() => {
    return statusList.find(obj => obj.alias === alias).class
  })

  return { statusTitle, statusClass }
}
