<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ code: string }>()

const { isDark } = useData()
const host = ref<HTMLElement | null>(null)
const baseId = `mermaid-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
let renderCount = 0

async function render() {
  if (!host.value) return
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark.value ? 'dark' : 'neutral',
    securityLevel: 'strict',
    fontFamily: 'var(--vp-font-family-base)',
  })
  // Mermaid requires a fresh element id per render call.
  const { svg } = await mermaid.render(`${baseId}-${renderCount++}`, decodeURIComponent(props.code))
  host.value.innerHTML = svg
}

onMounted(render)
watch(isDark, render)
</script>

<template>
  <div ref="host" class="mermaid-diagram" role="img" />
</template>
