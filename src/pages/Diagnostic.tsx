import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft, User, Briefcase, Heart, Compass, Star, Settings } from "lucide-react";

// RIASEC types based on Holland's typology (from IPPe / Evolution Pro)
const riasecTypes = {
  R: { label: "Réaliste", icon: Settings, color: "text-orange-600", desc: "Vous aimez les activités concrètes, le travail manuel et les résultats tangibles.", metiers: "Technicien, mécanicien, conducteur, agriculteur, chirurgien" },
  I: { label: "Investigateur", icon: Compass, color: "text-blue-600", desc: "Vous aimez la réflexion, la recherche et la résolution de problèmes complexes.", metiers: "Chercheur, analyste, biologiste, médecin, informaticien" },
  A: { label: "Artistique", icon: Star, color: "text-pink-600", desc: "Vous aimez créer, imaginer et vous exprimer librement.", metiers: "Designer, musicien, photographe, écrivain, architecte" },
  S: { label: "Social", icon: Heart, color: "text-red-500", desc: "Vous aimez aider, conseiller et accompagner les autres.", metiers: "Éducateur, psychologue, enseignant, animateur, conseiller" },
  E: { label: "Entreprenant", icon: Briefcase, color: "text-amber-600", desc: "Vous aimez diriger, convaincre et relever des défis.", metiers: "Chef d'entreprise, commercial, agent immobilier, responsable marketing" },
  C: { label: "Conventionnel", icon: User, color: "text-teal-600", desc: "Vous aimez l'organisation, la précision et les méthodes structurées.", metiers: "Comptable, assistant administratif, statisticien, documentaliste" },
};

type RiasecKey = keyof typeof riasecTypes;

interface QuestionOption {
  label: string;
  type: RiasecKey;
}

interface Question {
  id: number;
  question: string;
  groupA: QuestionOption[];
  groupB: QuestionOption[];
}

// Adapted from IPPe questionnaire (Annexe 9 - Evolution Pro)
const questions: Question[] = [
  {
    id: 1,
    question: "Dans quel environnement de travail préféreriez-vous exercer ?",
    groupA: [
      { label: "Un atelier de réparation", type: "R" },
      { label: "Un laboratoire de recherche", type: "I" },
      { label: "Un atelier de création artistique", type: "A" },
      { label: "Une association humanitaire", type: "S" },
      { label: "Un service commercial", type: "E" },
      { label: "Une agence bancaire", type: "C" },
    ],
    groupB: [
      { label: "Un chantier de construction", type: "R" },
      { label: "Un observatoire astronomique", type: "I" },
      { label: "Une salle de spectacle", type: "A" },
      { label: "Un centre social", type: "S" },
      { label: "Un marché de l'immobilier", type: "E" },
      { label: "Une administration publique", type: "C" },
    ],
  },
  {
    id: 2,
    question: "Quelle activité vous attirerait le plus ?",
    groupA: [
      { label: "Conduire des engins", type: "R" },
      { label: "Réfléchir aux causes d'un problème", type: "I" },
      { label: "Illustrer un site web", type: "A" },
      { label: "Prendre soin des autres", type: "S" },
      { label: "Prospecter des clients", type: "E" },
      { label: "Gérer des comptes", type: "C" },
    ],
    groupB: [
      { label: "Installer des équipements", type: "R" },
      { label: "Mener des recherches", type: "I" },
      { label: "Créer une œuvre", type: "A" },
      { label: "Conseiller des personnes", type: "S" },
      { label: "Négocier des contrats", type: "E" },
      { label: "Assurer le suivi d'un dossier", type: "C" },
    ],
  },
  {
    id: 3,
    question: "Dans une équipe, vous préféreriez être la personne qui…",
    groupA: [
      { label: "Vérifie le bon fonctionnement du matériel", type: "R" },
      { label: "Identifie les problèmes", type: "I" },
      { label: "Apporte des idées originales", type: "A" },
      { label: "Résout les conflits", type: "S" },
      { label: "Manage l'équipe", type: "E" },
      { label: "Rédige le compte-rendu de réunion", type: "C" },
    ],
    groupB: [
      { label: "Fabrique le produit", type: "R" },
      { label: "Cherche des solutions nouvelles", type: "I" },
      { label: "Crée des supports de communication illustrés", type: "A" },
      { label: "Facilite la communication", type: "S" },
      { label: "Fixe les objectifs et veille à leur atteinte", type: "E" },
      { label: "S'assure du respect des délais", type: "C" },
    ],
  },
  {
    id: 4,
    question: "Quel type de compétences aimeriez-vous mettre en œuvre ?",
    groupA: [
      { label: "Installer des équipements", type: "R" },
      { label: "Résoudre une énigme", type: "I" },
      { label: "Utiliser les techniques de dessin", type: "A" },
      { label: "Aider des personnes en difficulté", type: "S" },
      { label: "Négocier avec un fournisseur", type: "E" },
      { label: "Respecter des procédures", type: "C" },
    ],
    groupB: [
      { label: "Piloter une machine-outil", type: "R" },
      { label: "Inventer un nouveau produit", type: "I" },
      { label: "Réaliser des contenus multimédia", type: "A" },
      { label: "Transmettre mes connaissances", type: "S" },
      { label: "Diriger une équipe", type: "E" },
      { label: "Appliquer des normes de sécurité", type: "C" },
    ],
  },
  {
    id: 5,
    question: "Quels loisirs préféreriez-vous ?",
    groupA: [
      { label: "Jardiner", type: "R" },
      { label: "Faire partie d'un club scientifique", type: "I" },
      { label: "Faire de la photographie", type: "A" },
      { label: "Être bénévole dans une association", type: "S" },
      { label: "Présider une association", type: "E" },
      { label: "Être trésorier d'une association", type: "C" },
    ],
    groupB: [
      { label: "Bricoler", type: "R" },
      { label: "Lire des magazines scientifiques", type: "I" },
      { label: "Créer des costumes", type: "A" },
      { label: "Animer des ateliers avec des enfants ou personnes âgées", type: "S" },
      { label: "Jouer au poker", type: "E" },
      { label: "Gérer une bibliothèque de quartier", type: "C" },
    ],
  },
  {
    id: 6,
    question: "Dans quelles conditions de travail aimeriez-vous exercer ?",
    groupA: [
      { label: "Travailler avec des machines", type: "R" },
      { label: "Avoir un travail stimulant la réflexion", type: "I" },
      { label: "Avoir des horaires souples", type: "A" },
      { label: "Travailler en équipe", type: "S" },
      { label: "Avoir un rythme de travail soutenu", type: "E" },
      { label: "Avoir des horaires réguliers", type: "C" },
    ],
    groupB: [
      { label: "Travailler en extérieur", type: "R" },
      { label: "Devoir chercher moi-même des solutions", type: "I" },
      { label: "Avoir à faire preuve de créativité", type: "A" },
      { label: "Échanger avec les autres", type: "S" },
      { label: "Pouvoir relever des défis", type: "E" },
      { label: "Suivre des consignes précises", type: "C" },
    ],
  },
];

const Diagnostic = () => {
  const [current, setCurrent] = useState(0);
  // For each question, user picks 2 preferred (+) and 2 rejected (-) from combined group
  const [selections, setSelections] = useState<Record<number, { liked: Set<string>; disliked: Set<string> }>>({});
  const [finished, setFinished] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const q = questions[current];
  const allOptions = [...q.groupA, ...q.groupB];
  const sel = selections[q.id] || { liked: new Set<string>(), disliked: new Set<string>() };

  const toggleOption = (label: string, action: "like" | "dislike") => {
    setSelections((prev) => {
      const current = prev[q.id] || { liked: new Set<string>(), disliked: new Set<string>() };
      const liked = new Set(current.liked);
      const disliked = new Set(current.disliked);

      if (action === "like") {
        if (liked.has(label)) {
          liked.delete(label);
        } else {
          disliked.delete(label);
          if (liked.size < 4) liked.add(label);
        }
      } else {
        if (disliked.has(label)) {
          disliked.delete(label);
        } else {
          liked.delete(label);
          if (disliked.size < 4) disliked.add(label);
        }
      }

      return { ...prev, [q.id]: { liked, disliked } };
    });
  };

  const canGoNext = sel.liked.size >= 2 && sel.disliked.size >= 2;

  const computeResults = (): { type: RiasecKey; score: number }[] => {
    const scores: Record<RiasecKey, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    for (const qId of Object.keys(selections)) {
      const s = selections[Number(qId)];
      const question = questions.find((q) => q.id === Number(qId));
      if (!question || !s) continue;

      const allOpts = [...question.groupA, ...question.groupB];
      for (const opt of allOpts) {
        if (s.liked.has(opt.label)) scores[opt.type] += 1;
        if (s.disliked.has(opt.label)) scores[opt.type] -= 1;
      }
    }

    // Normalize: add 12 to each (like IPPe scoring)
    const results = (Object.keys(scores) as RiasecKey[]).map((type) => ({
      type,
      score: scores[type] + 12,
    }));

    results.sort((a, b) => b.score - a.score);
    return results;
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const results = finished ? computeResults() : [];
  const topTypes = results.slice(0, 3);
  const maxScore = 24;

  if (showIntro) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <section className="py-24">
            <div className="container mx-auto px-6 max-w-2xl animate-fade-up">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Méthode Fred · Diagnostic</p>
              <h1 className="text-3xl md:text-4xl tracking-tight mb-6">
                Questionnaire d'Intérêts Professionnels
              </h1>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Basé sur la méthode RIASEC (typologie de Holland), ce diagnostic vous aidera à identifier
                vos intérêts professionnels dominants pour mieux orienter votre parcours.
              </p>

              <div className="bg-card rounded-xl p-6 shadow-sm mb-8">
                <h3 className="font-semibold mb-3 font-sans">Comment ça marche ?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">1.</span>
                    6 questions vous seront posées avec 12 propositions chacune.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">2.</span>
                    Pour chaque question, choisissez les propositions que vous <strong className="text-foreground">préférez</strong> (👍) et celles que vous <strong className="text-foreground">rejetez</strong> (👎).
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">3.</span>
                    À la fin, vous découvrirez votre profil RIASEC et des pistes métiers.
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setShowIntro(false)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-xl transition-[box-shadow] active:scale-[0.97]"
              >
                Commencer le diagnostic
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-2xl">
            {!finished ? (
              <div className="animate-fade-up">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Question {current + 1} / {questions.length}</span>
                    <span>{Math.round(((current + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                      style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl tracking-tight mb-3">{q.question}</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Sélectionnez au moins <strong>2 que vous préférez</strong> (👍) et <strong>2 que vous ne voulez pas</strong> (👎).
                </p>

                <div className="grid gap-2 mb-8">
                  {allOptions.map((opt) => {
                    const isLiked = sel.liked.has(opt.label);
                    const isDisliked = sel.disliked.has(opt.label);
                    return (
                      <div
                        key={opt.label}
                        className={`flex items-center justify-between rounded-xl p-4 transition-all duration-200 ${
                          isLiked
                            ? "bg-primary/10 ring-2 ring-primary/30"
                            : isDisliked
                            ? "bg-destructive/5 ring-2 ring-destructive/20"
                            : "bg-card shadow-sm"
                        }`}
                      >
                        <span className="text-sm flex-1 pr-4">{opt.label}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleOption(opt.label, "like")}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all active:scale-[0.9] ${
                              isLiked
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "bg-secondary hover:bg-primary/10"
                            }`}
                          >
                            👍
                          </button>
                          <button
                            onClick={() => toggleOption(opt.label, "dislike")}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all active:scale-[0.9] ${
                              isDisliked
                                ? "bg-destructive text-destructive-foreground shadow-sm"
                                : "bg-secondary hover:bg-destructive/10"
                            }`}
                          >
                            👎
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  {current > 0 && (
                    <button
                      onClick={() => setCurrent(current - 1)}
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-border px-6 py-3 font-medium hover:bg-secondary transition-colors active:scale-[0.97]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Précédent
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium shadow-sm hover:shadow-md transition-[box-shadow,opacity] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"
                  >
                    {current < questions.length - 1 ? "Suivant" : "Voir mon profil"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Results */
              <div className="animate-fade-up">
                <div className="text-center mb-10">
                  <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Votre profil RIASEC</p>
                  <h2 className="text-3xl md:text-4xl tracking-tight mb-4">
                    {topTypes.map((t) => riasecTypes[t.type].label).join(" · ")}
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                    Voici vos 3 profils dominants selon la méthode de Holland, utilisée par les professionnels de l'orientation.
                  </p>
                </div>

                {/* Top 3 cards */}
                <div className="space-y-4 mb-8">
                  {topTypes.map((t, i) => {
                    const info = riasecTypes[t.type];
                    const Icon = info.icon;
                    const pct = Math.round((t.score / maxScore) * 100);
                    return (
                      <div key={t.type} className="bg-card rounded-xl p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-secondary ${info.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold font-sans text-lg">
                                #{i + 1} {info.label}
                              </span>
                              <span className="text-sm text-muted-foreground">({t.type})</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{info.desc}</p>
                            <div className="h-2 rounded-full bg-secondary overflow-hidden mb-2">
                              <div
                                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              <strong>Métiers correspondants :</strong> {info.metiers}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* All scores */}
                <div className="bg-card rounded-xl p-6 shadow-sm mb-8">
                  <h3 className="font-semibold mb-4 font-sans">Tous vos scores</h3>
                  <div className="space-y-3">
                    {results.map((r) => {
                      const info = riasecTypes[r.type];
                      const pct = Math.round((r.score / maxScore) * 100);
                      return (
                        <div key={r.type} className="flex items-center gap-3">
                          <span className={`text-sm font-semibold w-28 ${info.color}`}>{info.label}</span>
                          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">{r.score}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setCurrent(0);
                      setSelections({});
                      setFinished(false);
                      setShowIntro(true);
                    }}
                    className="rounded-lg border-2 border-border px-6 py-3 font-medium hover:bg-secondary transition-colors active:scale-[0.97]"
                  >
                    Refaire le diagnostic
                  </button>
                  <button
                    onClick={() => navigate("/cv-generator")}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-xl transition-[box-shadow] active:scale-[0.97]"
                  >
                    Optimiser mon CV
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Diagnostic;
