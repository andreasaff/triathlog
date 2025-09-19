<script lang="ts">
	  import type { Event } from "./event.ts";

    let { hours, days, addEvent, events } = $props();
</script>

<div class="calendar">
    <!-- the time column -->
    <div class="time-column">
        {#each hours as hour}
            <div class="time-cell">{hour}</div>
        {/each}
    </div>

    <!-- the day columns -->
        {#each days as day, _}
            <div class="day-column">
                {#each hours as _, hourIndex}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="day-cell" onclick={() => addEvent(day, hourIndex)}></div>
                {/each}

                <!-- render events -->
                {#each events.filter((event: Event) => event.start.toDateString() === day.toDateString()) as event}
                    <div 
                        class="event" 
                        style="
                            top: {(event.start.getHours() * 60 + event.start.getMinutes())}px; 
                            height: {((event.end.getTime() - event.start.getTime()) / (1000 * 60))}px;
                        "
                    >
                        {event.title} <br>
                        <small>{event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {event.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                    </div>
                {/each}
            </div>
        {/each}
</div>

<style>
     .calendar {
    display: grid;
    grid-template-columns: 60px repeat(7, 1fr);
    border-top: 1px solid #ccc;
  }

  .time-column {
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ccc;
  }

  .time-cell {
    height: 60px;
    font-size: 12px;
    padding-right: 4px;
    text-align: right;
    line-height: 60px;
    border-bottom: 1px solid #eee;
  }

  .day-column {
    position: relative;
    border-right: 1px solid #ccc;
  }

  .day-cell {
    height: 60px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }

  .event {
    position: absolute;
    left: 4px;
    right: 4px;
    background: rgba(0, 128, 255, 0.3);
    border-left: 4px solid #007bff;
    padding: 4px;
    font-size: 12px;
    border-radius: 3px;
  } 
</style>