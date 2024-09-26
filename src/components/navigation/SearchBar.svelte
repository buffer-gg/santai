<script lang="ts">
  import { cn } from "../../utils/cn";
  export let className: string;
</script>

<div class={cn("flex flex-row w-full max-w-96 overflow-clip rounded-full bg-white", className)}>
  <div class="p-2">Search...</div>
  <div class="h-full w-24 ml-auto bg-accent"></div>
</div>
