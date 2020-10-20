<script>
  import {
    PaginationNav,
    TextInput,
    Search,
    Button,
    Column,
    Tile,
    Row
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import * as api from 'api';
  import Search16 from "carbon-icons-svelte/lib/Search16";
  import Add20 from "carbon-icons-svelte/lib/Add20";

  let av = false
  let texts = []
  let total = 1
  let s = false
  let text_i = false
  let page = 0
  let text
  let res = {}
  let q = ''

  let av_t = function() {
    av = !av
  }

  $: snc(q, page)

  let snc = function() {
    if (q != '') {
      search()
    } else {
      get()
    }
  }

  let add = async function() {
    if (text.length > 37) {
      text_i = true
      return
    }
    res = await api.post(`add/${text}`)
    total = res.meta.total_pages
    texts = res.data
  }

  let search = async function() {
    res = await api.get(`search?q=${q}&page=${page+1}`)
    total = res.meta.total_pages
    texts = res.data
    s = true
  }
  
  let get = async function() {
    res = await api.get(`texts?page=${page+1}`)
    total = res.meta.total_pages
    texts = res.data
  }

  onMount(() => {
    get()
  })
</script>

<Row>
  <Search
    bind:value={q} />
  <Button 
    icon={Search16}
    hasIconOnly
    on:click={search}
    tooltipPosition="bottom"
    tooltipAlignment="center"
    iconDescription="Search" />
  <Button
    icon={Add20}
    hasIconOnly
    on:click={av_t}
    tooltipPosition="bottom"
    tooltipAlignment="center"
    iconDescription="Add Note" />
</Row>

<Row>
  <TextInput
    invalid={text_i}
    bind:value={text}
    invalidText="More than 37 characters" />
  <Button
    icon={Add20}
    hasIconOnly
    on:click={add}
    tooltiipPosition="bottom"
    tooltipAlignment="center"
    iconDescription="Submit" />
</Row>

<Row>
  <Column>
    {#each texts as text(text.id)}
      <Tile>{text.body}</Tile>
    {/each}
    <PaginationNav bind:page={page} loop total={total} />
  </Column>
</Row>
