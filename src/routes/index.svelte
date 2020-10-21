<script>
  import {
    PaginationNav,
    TextInput,
    Button,
    Column,
    Tile,
    Row
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import * as api from 'api';
  import Add20 from "carbon-icons-svelte/lib/Add20";

  let texts = []
  let total = 1
  let s = false
  let text_i = false
  let page = 0
  let text
  let res = {}
  let q = ''

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
    console.log(res.data)
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

<Row style="position: sticky">
  <Column noGutter lg={16} md={8} sm={4}>
    <TextInput
      placeholder="Search"
      bind:value={q} />
  </Column>
</Row>

<Row>
  <Column noGutter lg={15} md={7} sm={3}>
    <TextInput
      invalid={text_i}
      bind:value={text}
      placeholder="Add text"
      invalidText="More than 37 characters" />
  </Column>
  <Column noGutter lg={1} md={1} sm={1}>
    <Button
      icon={Add20}
      hasIconOnly
      on:click={add}
      tooltiipPosition="bottom"
      tooltipAlignment="center"
      iconDescription="Submit" />
  </Column>
</Row>

<Row>
  <Column noGutter lg={16} md={16} sm={16}>
    {#each texts as text(text.id)}
      <Tile>{text.body}</Tile>
    {/each}
    <PaginationNav bind:page={page} loop total={total} />
  </Column>
</Row>
