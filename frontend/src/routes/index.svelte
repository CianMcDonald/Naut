<script lang="ts">
	import SearchBar from '../lib/components/SearchBar.svelte';
	let backendAddress: string = "http://localhost:8080/"
</script>

<div class="contianer is-fluid">
	<h1 class="title is-1 has-text-centered">Naut</h1>
	<SearchBar address={backendAddress}/>
</div>
