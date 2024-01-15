<script>
    import { page } from '$app/stores';
    let activity = $page.url.searchParams.get('activity');
    console.log(activity);
</script>

<h1>{activity}</h1>