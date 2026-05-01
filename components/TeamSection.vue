<template>
  <section id="team" aria-labelledby="team-heading">
    <div class="section-tag reveal">// our team</div>
    <h2 id="team-heading" class="reveal">The <em>Minds</em> Behind aurobotix.com</h2>
    <p class="section-lead reveal">
      A passionate team of four professionals with diverse technical expertise —
      united by a drive to build exceptional AI.
    </p>

    <div class="team-grid">
      <article
        v-for="(member, i) in team"
        :key="member.name"
        class="team-card reveal"
        :class="`reveal-delay-${i}`"
      >
        <div class="avatar" :style="{ background: member.gradient }" :aria-label="member.name">
          {{ member.initials }}
        </div>
        <h3 class="member-name">{{ member.name }}</h3>
        <div class="member-role">{{ member.role }}</div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const team = [
  {
    name: 'Faran',
    role: 'Data Scientist',
    initials: 'F',
    gradient: 'linear-gradient(135deg, #0852a3, #0a6ed4)',
  },
  {
    name: 'Usman Gulzar',
    role: 'Python Developer',
    initials: 'UG',
    gradient: 'linear-gradient(135deg, #0a6ed4, #2a8af5)',
  },
  {
    name: 'Tasawar Hussain',
    role: 'PHP / Laravel / Frappe Developer',
    initials: 'TH',
    gradient: 'linear-gradient(135deg, #075f8c, #0a9aba)',
  },
  {
    name: 'Umer Sharif',
    role: 'Front-End Developer',
    initials: 'US',
    gradient: 'linear-gradient(135deg, #006b8f, #00b4d8)',
  },
]
</script>

<style scoped>
section { background: var(--dark2); }

.team-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem;
}

.team-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 2rem; text-align: center;
  transition: all 0.3s; position: relative; overflow: hidden;
}
.team-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transform: scaleX(0); transition: transform 0.3s; transform-origin: left;
}
.team-card:hover::before { transform: scaleX(1); }
.team-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.3); border-color: rgba(10,110,212,0.35); }

.avatar {
  width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 1.2rem;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; font-weight: 800;
  color: var(--white); box-shadow: 0 0 30px rgba(10,110,212,0.3);
}
.member-name { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.3rem; }
.member-role { font-size: 0.82rem; color: var(--accent); letter-spacing: 0.5px; }
</style>
