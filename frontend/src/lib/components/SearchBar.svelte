<script lang="ts">
	import { goto } from "$app/navigation";
	export let address: string;

	let summonerName: string | null;
	let region: string | null

	async function handleSearch() {
		try{
			await fetch(`${address}summoner/basic`)
			goto(`/summoner`)
		}
		catch {
			alert("failed")
		}
	}
</script>

<div class="container">
	<div class="columns">
		<div class="column is-full">
			<div class="field has-addons">
				<div class="control is-expanded">
					<input
						class="input is-primary is-rounded is-medium"
						type="text"
						placeholder="Summoner Name"
						bind:value={summonerName}
					/>
				</div>
				<div class="control">
					<div class="select is-medium is-primary">
						<select bind:value={region}>
							<option>EUW</option>
							<option>L</option>
						</select>
					</div>
				</div>
				<div class="control">
					<button type="submit" class="button is-rounded is-medium is-primary" on:click={handleSearch}
						>Search</button
					>
				</div>
			</div>
		</div>
	</div>
</div>
