"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const modules = [
  { no: "01", title: "AI Foundations", eyebrow: "UNDERSTAND", desc: "Build a clear mental model of AI, how it learns, and where it can support everyday teaching.", time: "45 min", lessons: 12, color: "coral" },
  { no: "02", title: "AI in the Classroom", eyebrow: "APPLY", desc: "Turn ideas into lesson plans, accessible activities, worksheets, translations and audio resources.", time: "60 min", lessons: 16, color: "blue" },
  { no: "03", title: "Responsible AI", eyebrow: "REFLECT", desc: "Use AI safely and thoughtfully—with a teacher in the loop, privacy in mind and outputs verified.", time: "50 min", lessons: 14, color: "violet" },
];

const questions = [
  { q: "AI can replace a teacher’s professional judgement.", options: ["True", "False"], answer: 1 },
  { q: "What is the best first step when AI gives a surprising fact?", options: ["Share it", "Verify it", "Ignore it"], answer: 1 },
  { q: "Which practice best protects student privacy?", options: ["Remove identifying information", "Use full names", "Upload student records"], answer: 0 },
  { q: "A teacher-in-the-loop means…", options: ["AI makes final decisions", "A teacher reviews and adapts AI output", "AI is never used"], answer: 1 },
  { q: "Which is an inclusive use of AI?", options: ["Accessible activities in multiple formats", "One format for everyone", "Skipping verification"], answer: 0 },
];

const stats = [
  { value: "284", label: "Teachers trained", note: "Across 8 cohorts" },
  { value: "3", label: "Modules completed", note: "42 learning resources" },
  { value: "91%", label: "Assessment pass rate", note: "Average score 87%" },
  { value: "4.8", label: "Average feedback", note: "Out of 5" },
];

function Logos() {
  return <div className="logos" aria-label="Programme partners">
    <div className="a4i-logo"><span className="a4i-mark">A4I</span><small>AI for Inclusion</small></div>
    <div className="ms-logo"><i className="ms-grid"><b/><b/><b/><b/></i><span>Microsoft</span></div>
    <div className="ve-logo"><span className="ve-eye">◉</span><strong>Vision Empower</strong><small>TRUST</small></div>
  </div>;
}

function Rating({ value, onChange, label }: { value: number; onChange: (n:number)=>void; label:string }) {
  return <div className="rating" role="radiogroup" aria-label={label}>{[1,2,3,4,5].map(n => <button type="button" key={n} aria-label={`${n} out of 5`} aria-pressed={value===n} className={value===n ? "active" : ""} onClick={()=>onChange(n)}>{n}</button>)}</div>;
}

export default function Home() {
  const [section, setSection] = useState("home");
  const [deck, setDeck] = useState<number | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [feedbackStep, setFeedbackStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [score, setScore] = useState<number | null>(null);
  const [learnerName, setLearnerName] = useState("");
  const [ratings, setRatings] = useState({ confidence: 0, verify: 0, useful: 0, responsible: 0, inclusive: 0 });
  const [summary, setSummary] = useState({ teachers: 284, completions: 3, passRate: 91, rating: 4.8 });

  useEffect(() => { fetch("/api/stats").then(r=>r.ok?r.json():null).then(d=>d&&setSummary(d)).catch(()=>{}); }, []);
  const computedScore = useMemo(() => answers.reduce((n,a,i)=>n+(a===questions[i].answer?1:0),0), [answers]);
  const nav = (id:string) => { setSection(id); document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); };

  async function sendFeedback(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/feedback", { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({...payload,...ratings}) });
    if (res.ok) { setSent(true); setSummary(s=>({...s,rating:Number(((s.rating*10+Number(ratings.useful))/11).toFixed(1))})); }
  }

  async function finishAssessment() {
    const finalScore = computedScore; setScore(finalScore);
    if (finalScore >= 4) { await fetch("/api/completions", {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name:learnerName,score:finalScore})}).catch(()=>{}); }
  }

  return <main>
    <header>
      <button className="brand" onClick={()=>nav("home")}><span>AI</span><strong>Shiksha</strong></button>
      <nav aria-label="Main navigation">
        <button onClick={()=>nav("modules")}>Modules</button><button onClick={()=>nav("assessment")}>Assessment</button><button onClick={()=>nav("impact")}>Impact</button>
      </nav>
      <Logos />
      <button className="feedback-top" onClick={()=>setFeedbackOpen(true)}>Give feedback <span>↗</span></button>
    </header>

    <section id="home" className="hero">
      <div className="hero-copy">
        <div className="kicker"><span/> A TEACHER’S AI LEARNING JOURNEY</div>
        <h1>Learn AI.<br/><em>Teach with confidence.</em></h1>
        <p>A practical learning space for educators to explore, apply and reflect on AI—responsibly, inclusively and at your own pace.</p>
        <div className="hero-actions"><button className="primary" onClick={()=>nav("modules")}>Explore the modules <span>↓</span></button><button className="text-btn" onClick={()=>nav("impact")}>See our impact <span>↗</span></button></div>
        <div className="trust"><span className="avatar-stack"><i>MK</i><i>AR</i><i>SP</i><i>+</i></span><strong>Built with 280+ educators</strong><small>Designed around real classroom needs</small></div>
      </div>
      <div className="hero-art" aria-label="Abstract learning pathway illustration">
        <div className="orbit one"/><div className="orbit two"/><div className="orange-dot"/><div className="blue-dot"/>
        <div className="path-card"><span className="tiny-label">YOUR LEARNING PATH</span><h3>3 modules.<br/>One confident educator.</h3><div className="path-line">{modules.map((m,i)=><div key={m.no}><b>{i<1?"✓":m.no}</b><span>{m.title}<small>{i===0?"Completed":i===1?"Up next":"Locked"}</small></span></div>)}</div><div className="path-progress"><span style={{width:"33%"}}/></div><small>1 of 3 modules complete</small></div>
      </div>
    </section>

    <section className="principles"><div><b>01</b><span>Practical, not technical</span></div><div><b>02</b><span>Built for every classroom</span></div><div><b>03</b><span>Teacher always in control</span></div></section>

    <section id="modules" className="modules-section">
      <div className="section-heading"><div><span>THE LEARNING JOURNEY</span><h2>Three modules.<br/><em>Real classroom change.</em></h2></div><p>Start with the basics, move into practical classroom use, and finish with the judgement to use AI responsibly.</p></div>
      <div className="module-grid">{modules.map((m,i)=><article className={`module ${m.color}`} key={m.no}><div className="module-top"><span>{m.no}</span><small>{m.eyebrow}</small></div><div className="module-icon">{i===0?"✦":i===1?"⌁":"◎"}</div><h3>{m.title}</h3><p>{m.desc}</p><div className="meta"><span>◷ {m.time}</span><span>▤ {m.lessons} slides</span></div><button onClick={()=>setDeck(i)}>View presentation <span>→</span></button></article>)}</div>
    </section>

    <section id="assessment" className="assessment-band"><div><span>READY TO CHECK YOUR LEARNING?</span><h2>Complete the assessment.<br/><em>Earn your certificate.</em></h2><p>Five short questions covering all three modules. Score 80% or more to receive your personalised certificate.</p><button className="primary light" onClick={()=>setAssessmentOpen(true)}>Start assessment <span>→</span></button></div><div className="certificate-mini"><div className="seal">✓</div><small>CERTIFICATE OF COMPLETION</small><h3>AI Skilling for Educators</h3><p>Presented to</p><strong>Your Name</strong><div className="cert-line"/><Logos /></div></section>

    <section id="impact" className="impact">
      <div className="section-heading"><div><span>OUR IMPACT, SO FAR</span><h2>Learning that<br/><em>travels beyond the room.</em></h2></div><p>Every completed session represents an educator taking practical, responsible AI into their learning community.</p></div>
      <div className="stats">{stats.map((s,i)=><article key={s.label}><b>{i===0?summary.teachers:i===1?summary.completions:i===2?`${summary.passRate}%`:summary.rating}</b>{i===3&&<span>/ 5</span>}<h3>{s.label}</h3><p>{s.note}</p></article>)}</div>
      <div className="quote"><span>“</span><blockquote>AI now feels less like a difficult technology and more like a thoughtful teaching partner—one I know how to question.</blockquote><p><strong>Workshop participant</strong><br/>Special Educator · Karnataka</p></div>
    </section>

    <section className="feedback-cta"><div><span>HELP US MAKE THE NEXT SESSION BETTER</span><h2>Your experience<br/><em>shapes what comes next.</em></h2></div><button onClick={()=>setFeedbackOpen(true)}>Share your feedback <span>↗</span></button></section>
    <footer><div className="footer-brand"><div className="brand"><span>AI</span><strong>Shiksha</strong></div><p>Practical AI learning for educators.</p></div><Logos/><p>© 2026 Vision Empower Trust<br/>Made for teachers, with teachers.</p></footer>

    {deck!==null && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${modules[deck].title} presentation`}><div className="deck-modal"><button className="close" onClick={()=>setDeck(null)}>×</button><div className={`deck-cover ${modules[deck].color}`}><small>MODULE {modules[deck].no}</small><div className="deck-symbol">{deck===0?"✦":deck===1?"⌁":"◎"}</div><h2>{modules[deck].title}</h2><p>{modules[deck].desc}</p><div className="deck-footer"><Logos/><span>{modules[deck].lessons} slides · {modules[deck].time}</span></div></div><div className="deck-actions"><button className="primary" onClick={()=>setAssessmentOpen(true)}>Continue to assessment</button><button onClick={()=>setDeck(null)}>Back to modules</button></div></div></div>}

    {feedbackOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Training feedback"><div className="form-modal"><button className="close" onClick={()=>setFeedbackOpen(false)}>×</button>{sent?<div className="success"><div>✓</div><span>FEEDBACK RECEIVED</span><h2>Thank you for helping us learn.</h2><p>Your reflections will help make future sessions even more useful and inclusive.</p><button className="primary" onClick={()=>{setFeedbackOpen(false);setSent(false)}}>Done</button></div>:<form onSubmit={sendFeedback}><span className="step">FEEDBACK · STEP {feedbackStep} OF 3</span><h2>{feedbackStep===1?"Tell us about yourself":feedbackStep===2?"How did the session feel?":"Help us improve"}</h2><div className="progress"><span style={{width:`${feedbackStep*33.33}%`}}/></div>
      {feedbackStep===1&&<div className="form-grid"><label>Full name<input name="name" required placeholder="Your name"/></label><label>Email address<input name="email" type="email" required placeholder="you@school.org"/></label><label>State<input name="state" required placeholder="e.g. Karnataka"/></label><label>School / Organisation<input name="school" required/></label><label>Role<select name="role" required defaultValue=""><option value="" disabled>Select role</option><option>Special Educator</option><option>General Teacher</option><option>School Administrator</option><option>Other</option></select></label><label>VE facilitator<input name="facilitator" required/></label></div>}
      {feedbackStep===2&&<div className="rating-list"><label>Confidence using AI tools <Rating label="Confidence using AI tools" value={ratings.confidence} onChange={n=>setRatings({...ratings,confidence:n})}/></label><label>Confidence deciding when to verify AI <Rating label="Confidence deciding when to verify" value={ratings.verify} onChange={n=>setRatings({...ratings,verify:n})}/></label><label>Usefulness of teacher-in-the-loop <Rating label="Usefulness of teacher-in-the-loop" value={ratings.useful} onChange={n=>setRatings({...ratings,useful:n})}/></label><label>Confidence using AI responsibly <Rating label="Confidence using AI responsibly" value={ratings.responsible} onChange={n=>setRatings({...ratings,responsible:n})}/></label><label>Usefulness for inclusive education <Rating label="Usefulness for inclusive education" value={ratings.inclusive} onChange={n=>setRatings({...ratings,inclusive:n})}/></label></div>}
      {feedbackStep===3&&<div className="form-stack"><label>What went well?<textarea name="wentWell" required/></label><label>What could be better?<textarea name="improve" required/></label><label>What would you like to learn next?<textarea name="nextTopics" required/></label><label>Would you recommend this workshop?<select name="recommend" required><option>Yes</option><option>No</option></select></label><label>Any other feedback?<textarea name="other"/></label></div>}
      <div className="form-actions">{feedbackStep>1&&<button type="button" onClick={()=>setFeedbackStep(feedbackStep-1)}>Back</button>} {feedbackStep<3?<button className="primary" type="button" onClick={()=>setFeedbackStep(feedbackStep+1)}>Continue →</button>:<button className="primary" type="submit">Submit feedback →</button>}</div></form>}</div></div>}

    {assessmentOpen&&<div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Assessment"><div className="form-modal assessment-modal"><button className="close" onClick={()=>setAssessmentOpen(false)}>×</button>{score===null?<><span className="step">FINAL ASSESSMENT · 5 QUESTIONS</span><h2>Show what you know.</h2><label className="name-field">Name for your certificate<input value={learnerName} onChange={e=>setLearnerName(e.target.value)} placeholder="Your full name"/></label><div className="quiz">{questions.map((q,i)=><fieldset key={q.q}><legend><b>{i+1}</b>{q.q}</legend>{q.options.map((o,j)=><label key={o}><input type="radio" name={`q${i}`} checked={answers[i]===j} onChange={()=>setAnswers(a=>a.map((v,k)=>k===i?j:v))}/><span>{o}</span></label>)}</fieldset>)}</div><button className="primary wide" disabled={!learnerName||answers.includes(-1)} onClick={finishAssessment}>Submit assessment →</button></>:score>=4?<div className="success certificate-success"><div>✓</div><span>YOU PASSED · {score}/5</span><h2>Congratulations, {learnerName}!</h2><p>Your certificate is ready. Use Print to save it as a PDF.</p><div className="certificate printable"><small>CERTIFICATE OF COMPLETION</small><h3>AI Skilling for Educators</h3><p>This certificate is proudly presented to</p><strong>{learnerName}</strong><p>for successfully completing three modules and the final assessment</p><Logos/></div><button className="primary" onClick={()=>window.print()}>Print certificate</button></div>:<div className="success"><div>↻</div><span>{score}/5 · KEEP LEARNING</span><h2>You’re nearly there.</h2><p>Review the modules and try again. You need 4 correct answers to pass.</p><button className="primary" onClick={()=>{setScore(null);setAnswers(Array(5).fill(-1))}}>Try again</button></div>}</div></div>}
  </main>;
}
