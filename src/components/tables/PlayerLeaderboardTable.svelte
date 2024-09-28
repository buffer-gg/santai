<script lang="ts">
  import { writable } from "svelte/store";
  import { createSvelteTable, flexRender, getCoreRowModel } from "@tanstack/svelte-table";
  import type { ColumnDef, TableOptions } from "@tanstack/svelte-table";

  enum SpectreRank {
    Unranked,
    Bronze,
    Silver,
    Gold,
    Platinum,
    Emerald,
    Ruby,
    Diamond,
    Champion,
  }

  type Player = {
    username: string;
    rank: SpectreRank;
    placement: number;
  };

  const defaultData: Player[] = [
    {
      username: "truo",
      rank: SpectreRank.Champion,
      placement: 1,
    },
    {
      username: "limited",
      rank: SpectreRank.Unranked,
      placement: 2,
    },
    {
      username: "haft",
      rank: SpectreRank.Emerald,
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

  const rerender = () => {
    options.update((options) => ({
      ...options,
      data: defaultData,
    }));
  };

  const table = createSvelteTable(options);
</script>

<div class="rounded-base bg-dark-1">
  <table class="w-full">
    <thead>
      {#each $table.getHeaderGroups() as headerGroup}
        <tr class="w-full border-b border-dark-2">
          {#each headerGroup.headers as header}
            <th>
              {#if !header.isPlaceholder}
                <svelte:component this={flexRender(header.column.columnDef.header, header.getContext())} />
              {/if}
            </th>
          {/each}
        </tr>
      {/each}
    </thead>
    <tbody>
      {#each $table.getRowModel().rows as row}
        <tr>
          {#each row.getVisibleCells() as cell}
            <td>
              <svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <!-- <button on:click={() => rerender()} class="border p-2">Rerender</button> -->
</div>
