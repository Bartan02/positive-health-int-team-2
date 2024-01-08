<script>
    let currentDate = new Date();
    let dates = getDatesRange(currentDate);
    let menuHeight = '20%'; // Height of the menu as a percentage of the viewport height

    function getDatesRange(date) {
        let range = [];
        for (let i = -2; i <= 2; i++) {
            let newDate = new Date(date);
            newDate.setDate(newDate.getDate() + i);
            range.push({
                date: newDate.getDate(),
                day: newDate.toLocaleString('en-US', { weekday: 'short' }),
                isToday: i === 0
            });
        }
        return range;
    }
</script>

<div class="flex justify-center p-4" style="position: absolute; top: {menuHeight}; left: 0; right: 0; margin-left: auto; margin-right: auto; width: 70%; z-index: 10;">
    {#each dates as dateObj, index (dateObj.date)}
        <!-- Add the line after '6' -->
        {#if index === 0}
            <div class="flex flex-col items-center flex-1">
                <div class="flex flex-col items-center justify-center px-5 py-2"
                    style="{dateObj.isToday ? 'background: linear-gradient(180deg, #F65800 0%, #F00 100%); color: white; border-radius: 9999px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);' : 'text-gray-700'}"
>
                    <span class="font-bold text-lg">{dateObj.date}</span>
                    <span class="text-xs">{dateObj.day}</span>
                </div>
            </div>
            <div class="flex flex-col items-center justify-end">
                <div class="w-0.5 bg-black h-full"></div> <!-- Make line black and full height -->
            </div>
        <!-- Add the line before '10' -->
        {:else if index === dates.length - 1}
            <div class="flex flex-col items-center justify-end">
                <div class="w-0.5 bg-black h-full"></div> <!-- Make line black and full height -->
            </div>
            <div class="flex flex-col items-center flex-1">
                <div class="flex flex-col items-center justify-center px-5 py-2"
                    style="{dateObj.isToday ? 'background: linear-gradient(180deg, #F65800 0%, #F00 100%); color: white; border-radius: 9999px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);' : 'text-gray-700'}"
>
                    <span class="font-bold text-lg">{dateObj.date}</span>
                    <span class="text-xs">{dateObj.day}</span>
                </div>
            </div>
        {:else}
            <div class="flex flex-col items-center flex-1">
                <div class="flex flex-col items-center justify-center px-5 py-2"
                    style="{dateObj.isToday ? 'background: linear-gradient(180deg, #F65800 0%, #F00 100%); color: white; border-radius: 9999px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);' : 'text-gray-700'}"
>
                    <span class="font-bold text-lg">{dateObj.date}</span>
                    <span class="text-xs">{dateObj.day}</span>
                </div>
            </div>
        {/if}
    {/each}
</div>
