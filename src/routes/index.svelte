<script>
  import {
    PaginationNav,
    UnorderedList,
    TextInput,
    ListItem,
    Search,
    Button,
    Column,
    Grid,
    Row,
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import * as api from 'api';
  import Search16 from "carbon-icons-svelte/lib/Search16";
  import Add20 from "carbon-icons-svelte/lib/Add20";

  let av = false
  let texts = []
  let total = 1
  let s = false
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
    console.log('log')
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

<Grid>
<Row>
  <TextInput
    maxlength=37
    size=37
    bind:value={text} />
  <Button
    icon={Add20}
    hasIconOnly
    on:click={add}
    tooltiipPosition="bottom"
    tooltipAlignment="center"
    iconDescription="Submit" />
</Row>
</Grid>

<div>{page}</div>
<div>{q}</div>

<Row>
  <Column noGutter>
   <UnorderedList>
    {#each texts as text(text.id)}
      <ListItem>{text.body}</ListItem>
    {/each}
   </UnorderedList>
  </Column>
  <PaginationNav bind:page={page} loop total={total} />
</Row>
