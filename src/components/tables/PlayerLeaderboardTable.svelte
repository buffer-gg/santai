<script lang="ts">
  import { writable } from "svelte/store";
  import { createSvelteTable, flexRender, getCoreRowModel } from "@tanstack/svelte-table";
  import type { ColumnDef, TableOptions } from "@tanstack/svelte-table";

  type Player = {
    username: string;
    rank: number;
    placement: number;
  };

  const defaultData: Player[] = [
    {
      username: "truo",
      rank: 20,
      placement: 1,
    },
    {
      username: "limited",
      rank: 10,
      placement: 2,
    },
    {
      username: "haft",
      rank: 10,
      placement: 3,
    },
  ];

  const defaultColumns: ColumnDef<Player>[] = [
    {
      accessorKey: "placement",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "username",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "rank",
      cell: (info) => info.getValue(),
    },
  ];

  const options = writable<TableOptions<Player>>({
    data: defaultData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const table = createSvelteTable(options);
</script>

<table class="w-full border border-dark-2 bg-dark-1">
  <thead class="bg-dark-2">
    {#each $table.getHeaderGroups() as headerGroup}
      <tr>
        {#each headerGroup.headers as header}
          <th class="p-base text-3xl text-light-0 font-dharmagothic font-light text-left">
            {header.id.toUpperCase()}
          </th>
        {/each}
      </tr>
    {/each}
  </thead>

  <tbody>
    {#each $table.getRowModel().rows as row}
      <tr
        class="group/row border border-dark-2 cursor-pointer text-light-2 outline outline-0 outline-offset-4 outline-accent hover:bg-accent hover:text-black hover:outline-2 duration-quick"
        on:click={() => (location.href = "https://www.santai.gg/players/" + row.getValue("username"))}
      >
        {#each row.getVisibleCells() as cell}
          <td class="p-base">
            {cell.getValue()}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
