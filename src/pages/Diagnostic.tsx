import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Savez-vous clairement quel poste ou quel secteur vous visez ?",
    options: [
      { label: "Oui, j'ai un objectif précis", score: 3 },
      { label: "J'ai une idée générale", score: 2 },
      { label: "Pas vraiment, je cherche encore", score: 1 },
      { label: "Aucune idée", score: 0 },
    ],
  },
  {
    id: 2,
    question: "Votre CV a-t-il été mis à jour au cours des 6 derniers mois ?",
    options: [
      { label: "Oui, il est à jour", score: 3 },
      { label: "Mis à jour il y a 6-12 mois", score: 2 },
      { label: "Plus d'un an", score: 1 },
      { label: "Je n'ai pas de CV", score: 0 },
    ],
  },
  {
    id: 3,
    question: "Utilisez-vous des verbes d'action et des chiffres dans vos expériences ?",
    options: [
      { label: "Oui, systématiquement", score: 3 },
      { label: "Parfois", score: 2 },
      { label: "Rarement", score: 1 },
      { label: "Je ne sais pas ce que c'est", score: 0 },
    ],
  },
  {
    id: 4,
    question: "Adaptez-vous votre CV à chaque offre d'emploi ?",
    options: [
      { label: "Oui, à chaque candidature", score: 3 },
      { label: "Parfois, pour les offres importantes", score: 2 },
      { label: "J'envoie toujours le même CV", score: 1 },
      { label: "Je ne savais pas qu'il fallait", score: 0 },
    ],
  },
  {
    id: 5,
    question: "Avez-vous un profil LinkedIn actif et optimisé ?",
    options: [
      { label: "Oui, complet et actif", score: 3 },
      { label: "J'en ai un mais peu actif", score: 2 },
      { label: "J'ai un profil basique", score: 1 },
      { label: "Je n'ai pas de LinkedIn", score: 0 },
    ],
  },
  {
    id: 6,
    question: "Comment préparez-vous vos entretiens d'embauche ?",
    options: [
      { label: "Recherches approfondies + simulation", score: 3 },
      { label: "Je me renseigne sur l'entreprise", score: 2 },
      { label: "Je regarde rapidement avant", score: 1 },
      { label: "J'improvise", score: 0 },
    ],
  },
  {
    id: 7,
    question: "Savez-vous identifier et formuler vos compétences transversales ?",
    options: [
      { label: "Oui, je sais les mettre en valeur", score: 3 },
      { label: "J'en connais quelques-unes", score: 2 },
      { label: "J'ai du mal à les formuler", score: 1 },
      { label: "Je ne sais pas ce que c'est", score: 0 },
    ],
  },
  {
    id: 8,
    question: "Avez-vous un réseau professionnel que vous activez dans votre recherche ?",
    options: [
      { label: "Oui, je l'utilise régulièrement", score: 3 },
      { label: "J'ai des contacts mais les sollicite peu", score: 2 },
      { label: "Mon réseau est très limité", score: 1 },
      { label: "Je n'ai aucun réseau", score: 0 },
    ],
  },
  {
    id: 9,
    question: "Êtes-vous à l'aise pour parler de vos réalisations professionnelles ?",
    options: [
      { label: "Oui, avec des exemples concrets", score: 3 },
      { label: "Moyennement, ça dépend du contexte", score: 2 },
      { label: "J'ai tendance à me sous-vendre", score: 1 },
      { label: "C'est très difficile pour moi", score: 0 },
    ],
  },
  {
    id: 10,
    question: "Votre lettre de motivation est-elle personnalisée pour chaque candidature ?",
    options: [
      { label: "Oui, toujours", score: 3 },
      { label: "Parfois", score: 2 },
      { label: "J'utilise un modèle générique", score: 1 },
      { label: "Je n'en envoie pas", score: 0 },
    ],
  },
];

const getResult = (score: number) => {
  const maxScore = questions.length * 3;
  const pct = Math.round((score / maxScore) * 100);
  if (pct >= 80) return { level: "Expert", color: "text-primary", message: "Excellent ! Vous maîtrisez les codes de la recherche d'emploi. Peaufinez les détails avec notre générateur de CV.", emoji: "🏆" };
  if (pct >= 60) return { level: "Avancé", color: "text-primary", message: "Bon niveau ! Quelques ajustements vous permettront de vous démarquer. Le générateur de CV va vous aider.", emoji: "👍" };
  if (pct >= 40) return { level: "Intermédiaire", color: "text-accent", message: "Vous avez des bases, mais il y a un vrai potentiel d'amélioration. La Méthode Fred peut transformer votre approche.", emoji: "💪" };
  return { level: "Débutant", color: "text-destructive", message: "Pas de panique ! Tout s'apprend. Commencez par notre générateur de CV pour créer un document percutant.", emoji: "📝" };
};

const Diagnostic = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 3;
  const pct = Math.round((totalScore / maxScore) * 100);
  const result = getResult(totalScore);
  const q = questions[current];
  const canGoNext = answers[q.id] !== undefined;

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

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
                    <span>{Math.round(((current) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                      style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl tracking-tight mb-8">{q.question}</h2>

                <div className="space-y-3 mb-10">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleAnswer(q.id, opt.score)}
                        className={`w-full text-left rounded-xl p-5 transition-[background,box-shadow,transform] duration-200 active:scale-[0.98] ${
                          selected
                            ? "bg-primary/10 shadow-md ring-2 ring-primary/30"
                            : "bg-card shadow-sm hover:bg-secondary"
                        }`}
                      >
                        <span className={`text-sm font-medium ${selected ? "text-primary" : "text-foreground"}`}>
                          {opt.label}
                        </span>
                      </button>
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
                    {current < questions.length - 1 ? "Suivant" : "Voir mes résultats"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Results */
              <div className="animate-fade-up text-center">
                <div className="text-6xl mb-6">{result.emoji}</div>
                <h2 className="text-3xl md:text-4xl tracking-tight mb-2">
                  Niveau : <span className={result.color}>{result.level}</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                  {result.message}
                </p>

                {/* Score circle */}
                <div className="mx-auto w-40 h-40 rounded-full border-8 border-secondary flex items-center justify-center mb-10 relative">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="72" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${pct * 4.52} 452`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="text-3xl font-bold font-display">{pct}%</span>
                </div>

                {/* Detail */}
                <div className="bg-card rounded-xl p-6 shadow-sm text-left mb-8">
                  <h3 className="font-semibold mb-4 font-sans">Détail par question</h3>
                  <div className="space-y-2">
                    {questions.map((q) => {
                      const s = answers[q.id] ?? 0;
                      return (
                        <div key={q.id} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${s >= 2 ? "text-primary" : s >= 1 ? "text-accent" : "text-destructive"}`} />
                          <span className="text-muted-foreground truncate flex-1">{q.question}</span>
                          <span className="font-medium">{s}/3</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => { setCurrent(0); setAnswers({}); setFinished(false); }}
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
