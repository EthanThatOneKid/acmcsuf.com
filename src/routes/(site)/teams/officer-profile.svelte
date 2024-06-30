<script lang="ts">
  import type { Officer, Team } from '$lib/public/board/types';
  import { termIndex, getPositionByTermIndex } from '$lib/public/board/utils';
  import BoardMember from '$lib/components/board-member/board-member.svelte';
  import { TEAMS } from '$lib/public/board/data/teams';

  export let info: Officer;
  export let team: Team | undefined = undefined;
  export let placeholderPicture = 'placeholder.webp';

  const officerName = info.fullName ?? '';
  const officerPicture = info.picture ?? placeholderPicture;
  const alt = `Image of ${officerName}.`;
  const officerDiscord = info.discord ?? '';

  $: officerPosition =
    getPositionByTermIndex(info, $termIndex)
      ?.map((p) => p.title)
      .join(', ') ?? '';

  $: titleHTML = Object.values(TEAMS).reduce((s, t) => {
    if (t.id === 'dev' && team?.id === 'gamedev') {
      return s;
    }

    return s.replace(t.title, `<a style="color:${t.color}" href="#${t.id}">${t.title}</a>`);
  }, officerPosition);
</script>

<div class="officer-container">
  <BoardMember {alt} src="/people/{officerPicture}" color={team?.color ?? 'var(--acm-blue)'} />
  <div>
    <h3 class="acm-heavier">{officerName}</h3>
    <p class="acm-heavy">{@html titleHTML}</p>
    <p>@{officerDiscord}</p>
  </div>
</div>

<style lang="scss">
  .officer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    p {
      max-width: 250px;
    }
  }
</style>
