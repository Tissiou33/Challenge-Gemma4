export type LegalDoc = {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  sections: { title: string; content: string }[];
};

export const TOGO_LEGAL_DOCS: LegalDoc[] = [
  {
    id: "constitution",
    title: "Constitution de la République Togolaise",
    category: "Constitution",
    year: "1992 (rév. 2019)",
    summary:
      "Loi fondamentale du Togo. Définit l'organisation des pouvoirs, les droits et libertés des citoyens, et le fonctionnement des institutions de la République.",
    sections: [
      {
        title: "Titre I — De l'État et de la souveraineté",
        content:
          "Le Togo est une République démocratique, laïque et sociale. La souveraineté nationale appartient au peuple qui l'exerce par ses représentants élus et par voie de référendum. Aucune fraction du peuple ni aucun individu ne peut s'en attribuer l'exercice.",
      },
      {
        title: "Titre II — Des droits, libertés et devoirs des citoyens",
        content:
          "Tout être humain a droit au libre développement de sa personnalité. Nul ne peut être soumis à la torture ni à des sévices ou traitements cruels, inhumains ou dégradants. Toute personne a droit à la liberté de pensée, de conscience, de religion, de culte, d'opinion et d'expression.",
      },
      {
        title: "Titre III — Du Pouvoir exécutif",
        content:
          "Le Président de la République est le Chef de l'État. Il veille au respect de la Constitution. Il assure, par son arbitrage, le fonctionnement régulier des pouvoirs publics ainsi que la continuité de l'État.",
      },
    ],
  },
  {
    id: "code-penal",
    title: "Code Pénal du Togo",
    category: "Code Pénal",
    year: "Loi n°2015-010",
    summary:
      "Définit les infractions pénales (crimes, délits, contraventions) et les peines applicables sur le territoire togolais.",
    sections: [
      {
        title: "Livre I — Dispositions générales",
        content:
          "Nul ne peut être condamné pour une action ou omission qui, au moment où elle a été commise, ne constituait pas une infraction d'après le droit national. Nulle peine ne peut être prononcée si elle n'est prévue par la loi.",
      },
      {
        title: "Livre II — Des crimes et délits contre les personnes",
        content:
          "L'homicide volontaire est puni de la réclusion criminelle à perpétuité. Les violences ayant entraîné la mort sans intention de la donner sont punies de 10 à 20 ans de réclusion. Les coups et blessures volontaires sont punis selon la gravité du dommage.",
      },
      {
        title: "Livre III — Des crimes et délits contre les biens",
        content:
          "Le vol simple est puni d'un emprisonnement de 1 à 5 ans et d'une amende. Le vol aggravé (avec violence, en bande organisée, avec arme) est puni de la réclusion criminelle. L'escroquerie et l'abus de confiance sont punis d'emprisonnement et d'amende proportionnelle au préjudice.",
      },
      {
        title: "Cybercriminalité",
        content:
          "Les infractions liées aux systèmes d'information (accès frauduleux, atteinte aux données, usurpation d'identité numérique) sont sanctionnées par des peines d'emprisonnement de 6 mois à 5 ans et des amendes selon la loi sur la cybersécurité.",
      },
    ],
  },
  {
    id: "code-domanial",
    title: "Code Foncier et Domanial",
    category: "Foncier",
    year: "Loi n°2018-005",
    summary:
      "Régit la propriété foncière, les droits coutumiers, l'immatriculation des terres et le domaine de l'État.",
    sections: [
      {
        title: "De la propriété foncière",
        content:
          "Le droit de propriété est garanti à toute personne physique ou morale. Il s'acquiert par immatriculation au livre foncier. Les droits fonciers coutumiers sont reconnus et peuvent être convertis en titre foncier selon la procédure légale.",
      },
      {
        title: "De l'immatriculation",
        content:
          "L'immatriculation est obligatoire pour toute transaction immobilière. La procédure comprend le bornage contradictoire, la publication, l'enquête publique et l'établissement du titre foncier par l'Office Togolais des Recettes (OTR).",
      },
      {
        title: "Du domaine de l'État",
        content:
          "Le domaine public de l'État est inaliénable et imprescriptible. Le domaine privé peut faire l'objet de cession, location ou concession. Toute occupation sans titre du domaine public est passible de sanctions.",
      },
    ],
  },
  {
    id: "code-travail",
    title: "Code du Travail",
    category: "Travail",
    year: "Loi n°2021-012",
    summary:
      "Régit les relations entre employeurs et travailleurs : contrats, durée du travail, salaires, congés, rupture du contrat.",
    sections: [
      {
        title: "Du contrat de travail",
        content:
          "Le contrat de travail peut être à durée déterminée (CDD) ou indéterminée (CDI). Le CDD ne peut excéder 4 ans renouvellements compris. Au-delà, il devient automatiquement un CDI. La période d'essai est limitée à 1 mois (ouvriers), 3 mois (employés) ou 6 mois (cadres).",
      },
      {
        title: "Durée du travail et congés",
        content:
          "La durée légale du travail est de 40 heures par semaine. Les heures supplémentaires donnent droit à une majoration. Le travailleur a droit à un congé annuel payé de 30 jours ouvrables après 12 mois de service effectif.",
      },
      {
        title: "Du licenciement",
        content:
          "Le licenciement doit être motivé par une cause réelle et sérieuse. Le préavis varie selon l'ancienneté. L'indemnité de licenciement est due sauf en cas de faute lourde. Le licenciement abusif ouvre droit à des dommages-intérêts.",
      },
    ],
  },
  {
    id: "code-environnement",
    title: "Code de l'Environnement",
    category: "Environnement",
    year: "Loi n°2008-005",
    summary:
      "Cadre juridique de la protection de l'environnement, étude d'impact, gestion des déchets et lutte contre la pollution.",
    sections: [
      {
        title: "Principes généraux",
        content:
          "Toute personne a droit à un environnement sain. Les principes de précaution, de prévention, du pollueur-payeur et de participation s'appliquent à toute activité ayant un impact sur l'environnement.",
      },
      {
        title: "Étude d'impact environnemental",
        content:
          "Tout projet susceptible d'avoir des incidences notables sur l'environnement est soumis à une étude d'impact préalable. Le certificat de conformité environnementale est délivré par le ministère en charge de l'environnement.",
      },
      {
        title: "Sanctions",
        content:
          "Les infractions environnementales sont punies d'amendes et/ou d'emprisonnement. Le contrevenant est tenu de remettre les lieux en état à ses frais.",
      },
    ],
  },
  {
    id: "code-personnes-famille",
    title: "Code des Personnes et de la Famille",
    category: "Famille",
    year: "Loi n°2012-014",
    summary:
      "Régit l'état civil, le mariage, le divorce, la filiation, l'adoption et les successions.",
    sections: [
      {
        title: "Du mariage",
        content:
          "L'âge minimum du mariage est de 18 ans pour les deux époux. Le mariage est célébré devant l'officier d'état civil. Les époux choisissent entre la monogamie et la polygamie au moment du mariage ; ce choix est définitif.",
      },
      {
        title: "Du divorce",
        content:
          "Le divorce peut être prononcé par consentement mutuel, pour faute, ou pour rupture de la vie commune. La procédure est juridictionnelle. Le juge statue sur la garde des enfants, la pension alimentaire et le partage des biens.",
      },
      {
        title: "Des successions",
        content:
          "La succession s'ouvre au décès. Les héritiers sont appelés selon l'ordre légal (descendants, conjoint, ascendants, collatéraux). Le testament permet de disposer d'une partie de ses biens dans la limite de la quotité disponible.",
      },
    ],
  },
];

export function buildLegalContextSummary(): string {
  return TOGO_LEGAL_DOCS.map(
    (d) => `- ${d.title} (${d.year}) — ${d.summary}`,
  ).join("\n");
}
