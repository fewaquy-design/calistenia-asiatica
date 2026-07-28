const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const src = path.join(ROOT, 'app', 'src', 'data', 'workouts.js');
const dest = path.join(ROOT, 'app-es', 'src', 'data', 'workouts.js');

let content = fs.readFileSync(src, { encoding: 'utf8' });


// ─── Translations ────────────────────────────────────────────────────────────

// Week metadata
const weekTrans = [
  ['Lista genérica de treinos focada em Calistenia Asiática (21 dias)', 'Lista genérica de entrenamientos enfocada en Calistenia Asiática (21 días)'],
  ['"subtitle": "Adaptação"', '"subtitle": "Adaptación"'],
  ['"description": "Aprender os movimentos e criar o hábito"', '"description": "Aprender los movimientos y crear el hábito"'],
  ['"subtitle": "Ativação"', '"subtitle": "Activación"'],
  ['"description": "Intensificando o ritmo e ganhando força"', '"description": "Intensificando el ritmo y ganando fuerza"'],
  ['"subtitle": "Consolidação"', '"subtitle": "Consolidación"'],
  ['"description": "Aperfeiçoando a técnica e resistência"', '"description": "Perfeccionando la técnica y la resistencia"'],
  // Day titles
  ['"title": "Dia ', '"title": "Día '],
];

// Exercise names
const exerciseNames = [
  ['Círculos de Braço Garça', 'Círculos de Brazo Garza'],
  ['Torção Rítmica em Pé', 'Torsión Rítmica de Pie'],
  ['Agachamento Templo', 'Sentadilla Templo'],
  ['Flexão na Parede', 'Flexión en la Pared'],
  ['Prancha Lotus', 'Plancha Loto'],
  ['Elevação de Perna Bambu', 'Elevación de Pierna Bambú'],
  ['Abdominal Bicicleta Fluido', 'Abdominal Bicicleta Fluido'],
  ['Elevação Pélvica Fluida', 'Elevación Pélvica Fluida'],
  ['Afundo Lado Direito', 'Estocada Lado Derecho'],
  ['Afundo Crescente', 'Estocada Creciente'],
  ['Polichinelo Suave', 'Saltijack Suave'],
  ['Corrida Estacionária', 'Carrera Estacionaria'],
  ['Escalada de Montanha', 'Escalada de Montaña'],
  ['Agachamento Sumo', 'Sentadilla Sumo'],
  ['Remada Inclinada', 'Remo Inclinado'],
  ['Flexão Diamante', 'Flexión Diamante'],
  ['Rotação de Quadril', 'Rotación de Cadera'],
  ['Prancha Lateral', 'Plancha Lateral'],
  ['Flexão Pike', 'Flexión Pike'],
  ['Burpee Modificado', 'Burpee Modificado'],
  ['Agachamento Isométrico', 'Sentadilla Isométrica'],
  ['Superman', 'Superman'],
  ['Flexão Completa', 'Flexión Completa'],
  ['Prancha com Rotação', 'Plancha con Rotación'],
  ['Elevação de Quadril', 'Elevación de Cadera'],
  ['Extensão de Tríceps', 'Extensión de Tríceps'],
  ['Agachamento Pistola', 'Sentadilla Pistola'],
  ['Mergulho no Chão', 'Fondos en el Suelo'],
  ['Polichinelo Leque', 'Saltijack Abanico'],
  ['Agachamento Lateral Deslizante', 'Sentadilla Lateral Deslizante'],
  ['Afundo Crescente (Esq)', 'Estocada Creciente (Izq)'],
  ['Afundo Crescente (Dir)', 'Estocada Creciente (Der)'],
  ['Chute Traseiro Rítmico', 'Patada Trasera Rítmica'],
  ['Flexão de Parede Fluida', 'Flexión de Pared Fluida'],
  ['Joelhos Altos Leves', 'Rodillas Altas Ligeras'],
  ['Tríceps no Banco/Cadeira', 'Tríceps en Silla/Banco'],
];

// Exercise descriptions
const descTrans = [
  ['Movimentos circulares suaves dos braços, aquecendo ombros e melhorando mobilidade.', 'Movimientos circulares suaves de los brazos, calentando los hombros y mejorando la movilidad.'],
  ['Rotação suave do tronco em pé, ativando a cintura e melhorando a mobilidade.', 'Rotación suave del tronco de pie, activando la cintura y mejorando la movilidad.'],
  ['Agachamento profundo focando no equilíbrio e no fortalecimento das pernas e glúteos.', 'Sentadilla profunda enfocándose en el equilibrio y el fortalecimiento de las piernas y glúteos.'],
  ['Flexão apoiada na parede, excelente para iniciantes desenvolverem força no peitoral.', 'Flexión apoyada en la pared, excelente para que principiantes desarrollen fuerza en el pectoral.'],
  ['Prancha com foco na respiração e sustentação, fortalecendo todo o core abdominal.', 'Plancha enfocada en la respiración y el sostenimiento, fortaleciendo todo el core abdominal.'],
  ['Elevação de pernas alternada, focada em ativar a parte inferior do abdômen.', 'Elevación de piernas alternada, enfocada en activar la parte inferior del abdomen.'],
  ['Movimento contínuo de bicicleta no chão, ativando o abdômen e oblíquos.', 'Movimiento continuo de bicicleta en el suelo, activando el abdomen y los oblicuos.'],
  ['Elevação do quadril ativando glúteos e posterior de coxa de forma fluida.', 'Elevación de cadera activando glúteos y la parte posterior del muslo de forma fluida.'],
  ['Passada focada no lado direito, melhorando simetria e força nas pernas.', 'Estocada enfocada en el lado derecho, mejorando simetría y fuerza en las piernas.'],
  ['Afundo mantido em isometria com alongamento crescente para flexibilidade.', 'Estocada mantenida en isometría con estiramiento creciente para la flexibilidad.'],
  ['Passada focada no lado esquerdo, completando a simetria e força nas pernas.', 'Estocada enfocada en el lado izquierdo, completando la simetría y fuerza en las piernas.'],
  ['Pulos suaves alternando braços e pernas, cardio de baixo impacto.', 'Saltos suaves alternando brazos y piernas, cardio de bajo impacto.'],
  ['Corrida no lugar com joelhos elevados, ativando cardio e pernas.', 'Carrera en el lugar con rodillas elevadas, activando cardio y piernas.'],
  ['Movimento de escalada em posição de prancha, ativando core e cardio.', 'Movimiento de escalada en posición de plancha, activando core y cardio.'],
  ['Agachamento com pés afastados, focando nos adutores e glúteos.', 'Sentadilla con pies separados, enfocándose en los aductores y glúteos.'],
  ['Curvatura para frente com puxada de braços, fortalecendo as costas.', 'Inclinación hacia adelante con jale de brazos, fortaleciendo la espalda.'],
  ['Flexão com mãos em diamante, isolando o tríceps.', 'Flexión con manos en diamante, aislando el tríceps.'],
  ['Rotação ampla do quadril para mobilidade e ativação do core.', 'Rotación amplia de la cadera para movilidad y activación del core.'],
  ['Prancha de lado sustentando o corpo, fortalecendo os oblíquos.', 'Plancha lateral sosteniendo el cuerpo, fortaleciendo los oblicuos.'],
  ['Flexão com quadril elevado em V, trabalhando ombros e tríceps.', 'Flexión con cadera elevada en V, trabajando hombros y tríceps.'],
  ['Agachamento mantido em posição baixa, força isométrica de pernas.', 'Sentadilla mantenida en posición baja, fuerza isométrica de piernas.'],
  ['Extensão do tronco em decúbito ventral, fortalecendo a lombar.', 'Extensión del tronco en decúbito prono, fortaleciendo la zona lumbar.'],
  ['Extensão do cotovelo em posição de prancha, isolando o tríceps.', 'Extensión del codo en posición de plancha, aislando el tríceps.'],
  ['Prancha com rotação lateral alternada, ativando todo o core e oblíquos.', 'Plancha con rotación lateral alternada, activando todo el core y los oblicuos.'],
  ['Elevação do quadril com pés apoiados, fortalecendo glúteos e posterior de coxa.', 'Elevación de cadera con pies apoyados, fortaleciendo glúteos y la parte posterior del muslo.'],
  ['Pulos suaves com movimentos amplos dos braços, ativando circulação.', 'Saltos suaves con movimientos amplios de los brazos, activando la circulación.'],
  ['Deslocamento lateral em posição de agachamento, focando em pernas e glúteos.', 'Desplazamiento lateral en posición de sentadilla, enfocado en piernas y glúteos.'],
  ['Afundo mantido em isometria com a perna esquerda à frente, focando na flexibilidade.', 'Estocada mantenida en isometría con la pierna izquierda adelante, enfocándose en la flexibilidad.'],
  ['Afundo mantido em isometria com a perna direita à frente, focando na flexibilidade.', 'Estocada mantenida en isometría con la pierna derecha adelante, enfocándose en la flexibilidad.'],
  ['Chutes para trás alternados, fortalecendo glúteos e melhorando mobilidade.', 'Patadas hacia atrás alternadas, fortaleciendo los glúteos y mejorando la movilidad.'],
  ['Flexão apoiada na parede com movimento constante, desenvolvendo força peitoral.', 'Flexión apoyada en la pared con movimiento constante, desarrollando la fuerza pectoral.'],
  ['Elevação alternada dos joelhos de forma leve e rítmica, ativando cardio.', 'Elevación alternada de rodillas de forma ligera y rítmica, activando cardio.'],
  ['Flexão de braços apoiando em uma cadeira ou banco, isolando o tríceps.', 'Flexión de brazos apoyándose en una silla o banco, aislando el tríceps.'],
];

// Tags
const tagTrans = [
  ['"Ombros"', '"Hombros"'],
  ['"Braços"', '"Brazos"'],
  ['"Oblíquos"', '"Oblicuos"'],
  ['"Core"', '"Core"'],
  ['"Pernas"', '"Piernas"'],
  ['"Glúteos"', '"Glúteos"'],
  ['"Peitoral"', '"Pectoral"'],
  ['"Resistência"', '"Resistencia"'],
  ['"Abdômen"', '"Abdomen"'],
  ['"Equilíbrio"', '"Equilibrio"'],
  ['"Flexibilidade"', '"Flexibilidad"'],
  ['"Costas"', '"Espalda"'],
  ['"Cardio"', '"Cardio"'],
  ['"Lombar"', '"Lumbar"'],
  ['"Adutores"', '"Aductores"'],
  ['"Corpo Todo"', '"Cuerpo Completo"'],
  ['"Tríceps"', '"Tríceps"'],
];

// Video path fix: videos stay on /entregravel/ path (shared)
// (no change needed, videos are shared)

// Apply all translations
const allTrans = [...weekTrans, ...exerciseNames, ...descTrans, ...tagTrans];
for (const [pt, es] of allTrans) {
  content = content.split(pt).join(es);
}

fs.writeFileSync(dest, content, 'utf8');
console.log('✅ workouts.js traduzido para espanhol!');
