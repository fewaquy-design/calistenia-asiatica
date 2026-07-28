const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app', 'src', 'data', 'workouts.js');
let content = fs.readFileSync(file, 'utf8');

let dataString = content.replace('export const weeks = ', 'return ');
let getWeeks = new Function(dataString);
let weeks = getWeeks();

const newExercises = [
  {
    name: "Polichinelo Leque",
    reps: "40s",
    video: "/entregravel/videos/polichinelo.mp4",
    description: "Pulos suaves com movimentos amplos dos braços, ativando circulação.",
    tags: ["Cardio", "Corpo Todo"]
  },
  {
    name: "Agachamento Templo",
    reps: "20x",
    video: "/entregravel/videos/Agachamento_Templo.mp4",
    description: "Agachamento profundo focando no equilíbrio e no fortalecimento das pernas e glúteos.",
    tags: ["Pernas", "Glúteos"]
  },
  {
    name: "Afundo Crescente (Esq)",
    reps: "40s",
    video: "/entregravel/videos/Afundo_Crescente.mp4",
    description: "Afundo mantido em isometria com a perna esquerda à frente, focando na flexibilidade.",
    tags: ["Flexibilidade", "Pernas"]
  },
  {
    name: "Afundo Crescente (Dir)",
    reps: "40s",
    video: "/entregravel/videos/Afundo_Crescente.mp4",
    description: "Afundo mantido em isometria com a perna direita à frente, focando na flexibilidade.",
    tags: ["Flexibilidade", "Pernas"]
  },
  {
    name: "Agachamento Lateral Deslizante",
    reps: "20x",
    video: "/entregravel/videos/agachamentoLateral.mp4",
    description: "Deslocamento lateral em posição de agachamento, focando em pernas e glúteos.",
    tags: ["Pernas", "Glúteos"]
  },
  {
    name: "Joelhos Altos Leves",
    reps: "40s",
    video: "/entregravel/videos/joelhoAlto.mp4",
    description: "Elevação alternada dos joelhos de forma leve e rítmica, ativando cardio.",
    tags: ["Cardio", "Pernas"]
  },
  {
    name: "Abdominal Bicicleta Fluido",
    reps: "30x",
    video: "/entregravel/videos/Abdominal_Bicicleta_Fluido.mp4",
    description: "Movimento contínuo de bicicleta no chão, ativando o abdômen e oblíquos.",
    tags: ["Oblíquos", "Core"]
  },
  {
    name: "Elevação de Perna Bambu",
    reps: "30x",
    video: "/entregravel/videos/Elevacao_de_Perna_Bambu.mp4",
    description: "Elevação de pernas alternada, focada em ativar a parte inferior do abdômen.",
    tags: ["Abdômen", "Pernas"]
  },
  {
    name: "Prancha Lótus",
    reps: "50s",
    video: "/entregravel/videos/Prancha_Lotus.mp4",
    description: "Prancha com foco na respiração e sustentação, fortalecendo todo o core abdominal.",
    tags: ["Core", "Resistência"]
  },
  {
    name: "Elevação Pélvica Fluida",
    reps: "25x",
    video: "/entregravel/videos/Elevacao_Pelvica_Fluida.mp4",
    description: "Elevação do quadril ativando glúteos e posterior de coxa de forma fluida.",
    tags: ["Glúteos", "Pernas"]
  },
  {
    name: "Tríceps no Banco/Cadeira",
    reps: "15x",
    video: "/entregravel/videos/tricepsCadeira.mp4",
    description: "Flexão de braços apoiando em uma cadeira ou banco, isolando o tríceps.",
    tags: ["Braços", "Tríceps"]
  },
  {
    name: "Flexão de Parede Fluida",
    reps: "20x",
    video: "/entregravel/videos/Flexao_de_Parede.mp4",
    description: "Flexão apoiada na parede com movimento constante, desenvolvendo força peitoral.",
    tags: ["Peitoral", "Braços"]
  }
];

let week3 = weeks.find(w => w.id === 3);
week3.days.forEach(day => {
  day.exercisesCount = newExercises.length;
  day.exercises = JSON.parse(JSON.stringify(newExercises)); // deep copy
});

let newContent = '// data/workouts.js\n// Lista genérica de treinos focada em Calistenia Asiática (21 dias)\n\nexport const weeks = ' + JSON.stringify(weeks, null, 2) + ';\n';
fs.writeFileSync(file, newContent, 'utf8');
console.log('Week 3 updated');
