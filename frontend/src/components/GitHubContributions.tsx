import { useEffect, useMemo, useState } from 'react';
import './GitHubContributions.css';

const API_URL = 'https://github-contributions-api.jogruber.de/v4';
const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function buildWeeks(contributions) {
  if (!contributions.length) return [];
  const byDate = new Map(contributions.map((day) => [day.date, day]));
  const first = new Date(`${contributions[0].date}T00:00:00Z`);
  const last = new Date(`${contributions[contributions.length - 1].date}T00:00:00Z`);
  first.setUTCDate(first.getUTCDate() - first.getUTCDay());
  last.setUTCDate(last.getUTCDate() + (6 - last.getUTCDay()));
  const weeks = [];
  for (let weekStart = new Date(first); weekStart <= last; weekStart.setUTCDate(weekStart.getUTCDate() + 7)) {
    const week = [];
    for (let weekday = 0; weekday < 7; weekday += 1) {
      const date = new Date(weekStart);
      date.setUTCDate(date.getUTCDate() + weekday);
      const key = date.toISOString().slice(0, 10);
      week.push(byDate.get(key) || { date: key, count: 0, level: 0 });
    }
    weeks.push(week);
  }
  return weeks;
}

export default function GitHubContributions({ username }) {
  const [contributions, setContributions] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(`${API_URL}/${encodeURIComponent(username)}?y=last`);
        if (!response.ok) throw new Error('GitHub activity is unavailable');
        const data = await response.json();
        if (!Array.isArray(data.contributions)) throw new Error('Invalid contribution data');
        if (active) {
          setContributions(data.contributions);
          setStatus('ready');
        }
      } catch {
        if (active) setStatus('error');
      }
    };
    load();
    const refresh = window.setInterval(load, 60 * 60 * 1000);
    return () => { active = false; window.clearInterval(refresh); };
  }, [username]);

  const weeks = useMemo(() => buildWeeks(contributions), [contributions]);
  const total = contributions.reduce((sum, day) => sum + day.count, 0);
  const monthLabels = weeks.map((week, index) => {
    const month = new Date(`${week[0].date}T00:00:00Z`).getUTCMonth();
    return index === 0 || month !== new Date(`${weeks[index - 1][0].date}T00:00:00Z`).getUTCMonth()
      ? new Date(`${week[0].date}T00:00:00Z`).toLocaleString('en', { month: 'short', timeZone: 'UTC' })
      : '';
  });

  return (
    <section className="github-activity-section" aria-labelledby="github-activity-title">
      <div className="shell">
        <div className="github-activity-heading">
          <div><p className="eyebrow">OPEN SOURCE</p><h2 id="github-activity-title">GitHub Contributions</h2></div>
          <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">@{username}<span aria-hidden="true"> ↗</span></a>
        </div>
        <div className="github-contribution-card" aria-label={`GitHub contributions for ${username}`}>
          {status === 'loading' && <p className="github-activity-message">Loading GitHub activity…</p>}
          {status === 'error' && <p className="github-activity-message">GitHub activity is temporarily unavailable. <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">View profile</a></p>}
          {status === 'ready' && <>
            <div className="github-activity-summary"><strong>{total.toLocaleString()} contributions</strong><span>in the last year</span></div>
            <div className="github-graph-scroll"><div className="github-graph" role="img" aria-label={`${total} GitHub contributions in the last year`}>
              <div className="github-weekday-labels" aria-hidden="true">{WEEKDAY_LABELS.map((label, index) => <span key={index}>{label}</span>)}</div>
              <div className="github-calendar-grid">{weeks.map((week, index) => <div className="github-week" key={week[0].date}><span className="github-month-label">{monthLabels[index]}</span>{week.map((day) => <span key={day.date} className={`github-day level-${Math.min(4, day.level || 0)}`} title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`} aria-hidden="true" />)}</div>)}</div>
            </div></div>
            <div className="github-activity-footer"><a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">View contribution details on GitHub</a><span className="github-legend">Less <i className="level-0" /><i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /> More</span></div>
          </>}
        </div>
      </div>
    </section>
  );
}
