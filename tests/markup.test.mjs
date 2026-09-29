import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
const data = await readFile(new URL('../app/workshop-data.mjs', import.meta.url), 'utf8');
const behavior = await readFile(new URL('../app/workshop-behavior.mjs', import.meta.url), 'utf8');
const renderedSources = `${page}\n${data}\n${behavior}`;

test('document shell publishes accurate metadata and an accessible entry path', () => {
  assert.match(layout, /LLM Agents Under Threat in Cyberspace/);
  assert.match(layout, /Proposed Workshop at AAAI-27/);
  assert.match(layout, /icon:\s*['"]\/favicon\.svg['"]/);
  assert.match(page, /href="#main-content"/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(page, /aria-expanded=/);
});

test('first viewport states proposal status, date, place, and local hero asset', () => {
  assert.match(renderedSources, /Proposed Workshop at AAAI-27/);
  assert.match(renderedSources, /February 22 or 23, 2027/);
  assert.match(renderedSources, /Montréal, Canada/);
  assert.match(page, /\/hero-montreal\.jpg/);
  assert.match(page, /Arild Vågen/);
  assert.match(page, /CC BY-SA 4\.0/);
});

test('first product slice has stable about and CFP anchor destinations', () => {
  assert.match(page, /id="about"/);
  assert.match(page, /id="cfp"/);
  assert.match(page, /researchQuestions\.map/);
  assert.match(page, /cfpTopics\.map/);
});

test('responsive interaction styling protects keyboard and motion preferences', () => {
  assert.match(styles, /position:\s*sticky/);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /scroll-margin-top/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(styles, /--color-ink:/);
  assert.match(styles, /--color-cyan:/);
  assert.match(page, /hidden={!menuOpen}/);
  assert.match(page, /menuButtonRef\.current\?\.focus\(\)/);
  assert.match(styles, /\.mobile-nav\[hidden\]\s*{\s*display:\s*none\s*!important/);
});

test('complete page exposes every public section and proposal-derived person', () => {
  for (const id of ['dates', 'schedule', 'speakers', 'organizers', 'contact']) {
    assert.match(page, new RegExp(`id=["']${id}["']`));
  }

  for (const name of [
    'Wenyuan Xu', 'Bo Li', 'Nicolas Papernot', 'Niloofar Mireshghallah',
    'Xinfeng Li', 'Aditi Raghunathan', 'Xinyue Shen', 'Wenbo Pan',
    'Florian Tramèr', 'Neil Gong', 'Virginia Smith', 'Tongliang Liu',
    'Z. Jane Wang', 'Junhao Dong',
  ]) {
    assert.match(renderedSources, new RegExp(name));
  }
});

test('complete page preserves safe public-contact and asset boundaries', () => {
  for (const asset of ['/people/li.jpg', '/people/rag.jpg', '/people/shen.jpg', '/people/pan.jpg']) {
    assert.match(renderedSources, new RegExp(asset.replace('.', '\\.')));
  }
  assert.equal((data.match(/xinfeng\.li@polyu\.edu\.hk/g) ?? []).length, 1);
  assert.match(page, /CC BY-SA 4\.0/);
  assert.doesNotMatch(renderedSources, /\b(?:openreview|hotcrp)\b|https?:\/\/[^'"\s]*submit|phone|postal address/i);
});

test('complete page renders every tentative date and schedule record', () => {
  assert.match(page, /importantDates\.map/);
  assert.match(page, /schedule\.map/);
  assert.match(page, /speakers\.map/);
  assert.match(page, /organizers\.map/);
  assert.match(page, /advisers\.map/);
});

test('intermediate widths stack dense rows before they can overflow', () => {
  const tabletRules = styles.match(/@media \(max-width: 900px\) \{([\s\S]*?)\n\}/)?.[1] ?? '';
  assert.match(tabletRules, /\.topic-row\s*{[^}]*grid-template-columns:\s*34px 1fr 20px/);
  assert.match(tabletRules, /\.schedule-list li\s*{[^}]*grid-template-columns:\s*38px 1fr auto/);
});

test('server-rendered content is visible before reveal JavaScript initializes', () => {
  assert.match(styles, /\[data-reveal\]\s*{\s*opacity:\s*1;\s*transform:\s*none/);
  assert.match(styles, /\[data-reveal\]\.reveal-pending\s*{[^}]*opacity:\s*0/);
  assert.match(renderedSources, /classList\.add\('reveal-pending'\)/);
});
