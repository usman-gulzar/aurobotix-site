<template>
  <div>
    <HeroSection />
    <StatsStrip />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <TestimonialsSection />
    <MissionVisionSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'aurobotix.com — IT Services & Digital Solutions',
  description:
    'Enterprise-grade software development, cloud, cybersecurity, and IT consulting. aurobotix.com helps organizations design, build, and run reliable digital systems.',
  ogTitle: 'aurobotix.com — Technology Partner for Modern Business',
  ogDescription:
    'Custom software, cloud architecture, integration, and strategic IT services tailored to your roadmap.',
  ogImage: 'https://aurobotix.com/og-image.png',
  twitterCard: 'summary_large_image',
})

useScrollAnimations()
</script>
