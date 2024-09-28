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

  const defaultColumns: ColumnDef<Person>[] = [
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

  const options = writable<TableOptions<Person>>({
    data: defaultData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const table = createSvelteTable(options);
</script>

<table class="w-full rounded-base border border-dark-2 bg-dark-1">
  <thead class="bg-dark-2">
    {#each $table.getHeaderGroups() as headerGroup}
      <tr>
        {#each headerGroup.headers as header}
          <th class="text-2xl text-light-0 font-dharmagothic font-light">
            <svelte:component this={flexRender(header.column.columnDef.header, header.getContext())} />
          </th>
        {/each}
      </tr>
    {/each}
  </thead>

  <tbody>
    {#each $table.getRowModel().rows as row}
      <a href="/">
        <tr class="border border-dark-2">
          {#each row.getVisibleCells() as cell}
            <td class="p-base text-light-2">
              <svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
            </td>
          {/each}
        </tr>
      </a>
    {/each}
  </tbody>
</table>
