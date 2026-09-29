import test from 'node:test';
import assert from 'node:assert/strict';

import {
  advisers,
  cfpTopics,
  importantDates,
  organizers,
  researchQuestions,
  schedule,
  speakers,
  workshop,
} from '../app/workshop-data.mjs';
import {
  escapeHtml,
  renderDates,
  renderPeople,
  renderSchedule,
} from '../app/workshop-render.mjs';

test('proposal-derived content has the exact public workshop contract', () => {
  assert.equal(workshop.title, 'LLM Agents Under Threat in Cyberspace');
  assert.equal(workshop.status, 'Proposed Workshop at AAAI-27');
  assert.equal(workshop.location, 'Montréal, Canada');
  assert.equal(workshop.date, 'February 22 or 23, 2027');
  assert.equal(workshop.contact, 'xinfeng.li@polyu.edu.hk');
  assert.equal(researchQuestions.length, 3);
  assert.equal(cfpTopics.length, 5);
  assert.equal(importantDates.length, 4);
  assert.equal(schedule.length, 13);
  assert.equal(speakers.length, 4);
  assert.equal(organizers.length, 4);
  assert.equal(advisers.length, 6);

  const publicContent = JSON.stringify({
    workshop,
    researchQuestions,
    cfpTopics,
    importantDates,
    schedule,
    speakers,
    organizers,
    advisers,
  });
  assert.doesNotMatch(publicContent, /phone|postal|room\s+\d|street address/i);
  assert.doesNotMatch(publicContent, /openreview|hotcrp|register now|submit now/i);
});

test('all event-specific records are visibly tentative', () => {
  assert.ok(importantDates.every((record) => record.tentative === true));
  assert.ok(schedule.every((record) => record.tentative === true));
  assert.ok(speakers.every((record) => record.tentative === true));
  assert.ok(organizers.every((record) => record.tentative === true));
  assert.ok(advisers.every((record) => record.tentative === true));
});

test('render helpers escape content and preserve semantic labels', () => {
  assert.equal(escapeHtml('<script>"x" & y</script>'), '&lt;script&gt;&quot;x&quot; &amp; y&lt;/script&gt;');

  const datesMarkup = renderDates([
    { label: '<Deadline>', value: 'Nov 20', note: 'Anywhere on Earth', tentative: true },
  ]);
  assert.match(datesMarkup, /&lt;Deadline&gt;/);
  assert.match(datesMarkup, /Tentative/);

  const scheduleMarkup = renderSchedule([
    { time: '08:30–08:45', title: 'Opening', type: 'Workshop', tentative: true },
  ]);
  assert.match(scheduleMarkup, /<time[^>]*>08:30–08:45<\/time>/);
  assert.match(scheduleMarkup, /Tentative/);

  const peopleMarkup = renderPeople([
    { name: 'A. Researcher', affiliation: 'Example University', role: 'Program Chair', tentative: true },
  ], 'organizer');
  assert.match(peopleMarkup, /data-kind="organizer"/);
  assert.match(peopleMarkup, /Program Chair/);
});
