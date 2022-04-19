<script lang="ts">
    export let category: string;
</script>

<div class="category-card">
    <h2>{category}</h2>
    <button> Take the surveys! </button>
</div>

<style>
    .category-card {
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 20px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: 0.2s ease;
    }

    .category-card:hover {
        transform: scale(1.04);
    }

    .category-card h2 {
        padding-top: 0.5rem;
        padding-left: 1.5rem;
    }

    .category-card button {
        width: 20%;
        display: block;
        margin-left: auto;
        margin-right: 1.5rem;
        margin-bottom: 1.5rem;
        padding: 0.5rem;
        border-radius: 15px;
        border: none;
        background-color: #3e01b4;
        color: white;
        box-shadow: 0px 2px 5px #3e01b4;
        transition: 0.2s ease;
    }

    .category-card button:hover {
        background: rgba(255, 255, 0, 0);
        color: #3e01b4;
        border: 2px #3e01b4;
        cursor: pointer;
        box-shadow: 0px 0px 10px #3e01b4;
    }
</style>
