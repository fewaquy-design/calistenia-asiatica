const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

// ─── DICTIONARY: Portuguese → Spanish ───────────────────────────────────────
// Ordered from longest/most specific to shortest to avoid partial replacements
const dict = [
  // HTML lang attribute
  ['lang="pt-BR"', 'lang="es"'],
  
  // <title> tags
  ['Programa de Calistenia para Mulheres', 'Programa de Calistenia para Mujeres'],

  // CSS / asset paths adjustment for /es/pages/ depth (same as PT /pages/)
  // These already reference ../css and ../js which will still work

  // ── index.html specific ──────────────────────────────────────────────────
  ['Programa de Calistenia Asiática <span class="hl">para Mulheres</span>', 'Programa de Calistenia Asiática <span class="hl">para Mujeres</span>'],
  ['De acordo com sua idade', 'De acuerdo con tu edad'],
  ['TESTE DE 1 MINUTO', 'TEST DE 1 MINUTO'],
  ['Ao escolher sua idade e continuar, concorda com nossos', 'Al elegir tu edad y continuar, aceptas nuestros'],
  ['Termos de Serviço', 'Términos de Servicio'],
  ['reconhece nossa', 'reconoces nuestra'],
  ['Política de Privacidade', 'Política de Privacidad'],
  ['Política de Cookies', 'Política de Cookies'],

  // ── step2 ────────────────────────────────────────────────────────────────
  ['Elas conseguiram e você também pode', 'Ellas lo lograron y tú también puedes'],
  ['Mais de 27 milhões de mulheres já transformaram suas vidas com a Calistenia Asiática', 'Más de 27 millones de mujeres ya transformaron sus vidas con la Calistenia Asiática'],

  // ── step3 ────────────────────────────────────────────────────────────────
  ['Você já experimentou exercícios de calistenia?', '¿Ya has experimentado ejercicios de calistenia?'],
  ['Mulher calistenia', 'Mujer calistenia'],

  // ── step4-sim ────────────────────────────────────────────────────────────
  ['Você já tem a base, mas a Calistenia Asiática é diferente da calistenia comum.', 'Ya tienes la base, pero la Calistenia Asiática es diferente de la calistenia común.'],
  ['Enquanto o método tradicional foca apenas em força externa, nossa técnica ativa as <strong>fibras profundas</strong>, agindo na musculatura interna, onde eliminamos a <strong>gordura mais difícil de queimar</strong> e destravamos o seu metabolismo de forma definitiva.', 'Mientras el método tradicional se enfoca solo en la fuerza externa, nuestra técnica activa las <strong>fibras profundas</strong>, actuando en la musculatura interna, donde eliminamos la <strong>grasa más difícil de quemar</strong> y desbloqueamos tu metabolismo de forma definitiva.'],
  ['Calistenia Asiática', 'Calistenia Asiática'],

  // ── step4-nao ────────────────────────────────────────────────────────────
  ['Não se preocupe, a Calistenia Asiática é perfeita para quem está começando do zero!', '¡No te preocupes, la Calistenia Asiática es perfecta para quienes están empezando desde cero!'],
  ['Calistenia significa usar apenas o peso do seu corpo, e nossa técnica simplifica tudo ao focar na ativação das <strong>fibras profundas</strong>. É o caminho mais rápido para você <strong>destravar o metabolismo</strong> e <strong>secar a barriga</strong> sem o esforço exaustivo da academia.', 'Calistenia significa usar solo el peso de tu cuerpo, y nuestra técnica lo simplifica todo al enfocarse en la activación de las <strong>fibras profundas</strong>. Es el camino más rápido para <strong>desbloquear tu metabolismo</strong> y <strong>reducir el abdomen</strong> sin el esfuerzo agotador del gimnasio.'],
  ['Calistenia Asiática para iniciantes', 'Calistenia Asiática para principiantes'],

  // ── step5 ────────────────────────────────────────────────────────────────
  ['Qual é seu <span>principal objetivo</span>?', '¿Cuál es tu <span>objetivo principal</span>?'],
  ['Perder peso', 'Perder peso'],
  ['Desenvolver músculos', 'Desarrollar músculos'],
  ['Manter o peso e ficar em forma', 'Mantener el peso y mantenerse en forma'],
  ['Melhorar a aptidão física', 'Mejorar la condición física'],

  // ── Common PT phrases ────────────────────────────────────────────────────
  ['Continuar', 'Continuar'],
  ['CONTINUAR', 'CONTINUAR'],
  ['Sim', 'Sí'],
  ['Não', 'No'],
  ['by Atlas', 'by Atlas'],

  // ── step6-8 area (lifestyle questions) ──────────────────────────────────
  ['Como você descreveria seu estilo de vida atual?', '¿Cómo describirías tu estilo de vida actual?'],
  ['Sedentário (fico a maior parte do tempo sentada)', 'Sedentario (paso la mayor parte del tiempo sentada)'],
  ['Levemente ativo (caminhadas ocasionais)', 'Ligeramente activo (caminatas ocasionales)'],
  ['Moderadamente ativo (exercícios 2-3x por semana)', 'Moderadamente activo (ejercicios 2-3 veces por semana)'],
  ['Muito ativo (exercícios regulares e intensos)', 'Muy activo (ejercicios regulares e intensos)'],

  ['Quantas horas você dorme por noite em média?', '¿Cuántas horas duermes por noche en promedio?'],
  ['Menos de 5 horas', 'Menos de 5 horas'],
  ['Entre 5 e 6 horas', 'Entre 5 y 6 horas'],
  ['Entre 7 e 8 horas', 'Entre 7 y 8 horas'],
  ['Mais de 8 horas', 'Más de 8 horas'],

  ['Você sofre de alguma das condições abaixo?', '¿Sufres alguna de las siguientes condiciones?'],
  ['Problemas nas articulações (joelho, quadril, etc.)', 'Problemas en las articulaciones (rodilla, cadera, etc.)'],
  ['Dores nas costas ou coluna', 'Dolores de espalda o columna'],
  ['Hipertensão ou problemas cardíacos', 'Hipertensión o problemas cardíacos'],
  ['Nenhuma das opções acima', 'Ninguna de las opciones anteriores'],

  ['Com que frequência você se exercita atualmente?', '¿Con qué frecuencia haces ejercicio actualmente?'],
  ['Nunca', 'Nunca'],
  ['1 vez por semana', '1 vez por semana'],
  ['2-3 vezes por semana', '2-3 veces por semana'],
  ['4 ou mais vezes por semana', '4 o más veces por semana'],

  // ── Motivational / proof pages ───────────────────────────────────────────
  ['Apenas 7 minutos por dia', 'Solo 7 minutos al día'],
  ['transformarão seu corpo e <span>destravarão o seu metabolismo</span> sem o esforço exaustivo da academia!', 'transformarán tu cuerpo y <span>desbloquearán tu metabolismo</span> sin el esfuerzo agotador del gimnasio!'],
  ['O Protocolo de Calistenia Asiática utiliza ativações de fibras profundas para derreter a gordura acumulada e chapar a barriga, agindo onde os exercícios comuns de academia não conseguem chegar, de forma simples e definitiva..', 'El Protocolo de Calistenia Asiática utiliza activaciones de fibras profundas para derretir la grasa acumulada y marcar el abdomen, actuando donde los ejercicios comunes del gimnasio no pueden llegar, de forma simple y definitiva.'],

  // ── Loading/analyzing pages ───────────────────────────────────────────────
  ['Analisando seu perfil...', 'Analizando tu perfil...'],
  ['Personalizando seu plano...', 'Personalizando tu plan...'],
  ['Calculando seu metabolismo...', 'Calculando tu metabolismo...'],
  ['Pronto! Seu plano está sendo gerado', '¡Listo! Tu plan está siendo generado'],

  // ── step35 / VSL / Sales page ─────────────────────────────────────────────
  ['Seu plano de Calistenia Asiática está pronto!', '¡Tu plan de Calistenia Asiática está listo!'],
  ['Assista ao vídeo abaixo para entender como funciona...', 'Mira el video a continuación para entender cómo funciona...'],
  ['Obter meu plano personalizado agora', 'Obtener mi plan personalizado ahora'],
  ['Pagamento 100% seguro | Acesso Imediato', 'Pago 100% seguro | Acceso Inmediato'],
  ['Programa prático de treinos', 'Programa práctico de entrenamientos'],
  ['focados na queima de gordura e tonificação sem sobrecarregar as articulações.', 'enfocados en la quema de grasa y tonificación sin sobrecargar las articulaciones.'],
  ['Cronograma flexível', 'Cronograma flexible'],
  ['com 15 a 20 minutos de exercícios em casa por dia, sem precisar de aparelhos.', 'con 15 a 20 minutos de ejercicios en casa por día, sin necesidad de equipos.'],
  ['Guia de Alimentação Saudável:', 'Guía de Alimentación Saludable:'],
  ['Passo a passo prático de como acelerar o metabolismo sem dietas malucas.', 'Paso a paso práctico de cómo acelerar el metabolismo sin dietas extremas.'],
  ['Acesso Imediato pelo App', 'Acceso Inmediato por la App'],
  ['onde você vai acompanhar seu progresso diário direto do celular.', 'donde seguirás tu progreso diario directamente desde tu celular.'],
  ['🔥 74% de desconto apenas HOJE!', '🔥 ¡74% de descuento solo HOY!'],
  ['De R$ 147,00 por apenas', 'De R$ 147,00 por solo'],
  ['Acesso vitalício | Pagamento único (Não é mensalidade)', 'Acceso vitalicio | Pago único (No es mensualidad)'],
  ['Quero transformar meu corpo agora', 'Quiero transformar mi cuerpo ahora'],
  ['Resultados reais de mulheres como você', 'Resultados reales de mujeres como tú'],
  ['Beatriz — Perdeu 7kg em 30 dias', 'Beatriz — Perdió 7kg en 30 días'],
  ['"Eu estava estagnada com meu peso e sem tempo. A Calistenia Asiática me ajudou muito e hoje me sinto muito melhor e disposta, tudo isso treinando só 15 minutinhos por dia na minha sala!"', '"Estaba estancada con mi peso y sin tiempo. La Calistenia Asiática me ayudó mucho y hoy me siento mucho mejor y con energía, ¡todo esto entrenando solo 15 minutitos al día en mi sala!"'],
  ['Carla — Perdeu 5kg e definiu o corpo', 'Carla — Perdió 5kg y tonificó su cuerpo'],
  ['"Nunca pensei que conseguiria resultados tão bons treinando em casa. Minhas pernas e bumbum estão muito mais firmes e a barriga secou bastante. Recomendo para todas!"', '"Nunca pensé que conseguiría resultados tan buenos entrenando en casa. Mis piernas y glúteos están mucho más firmes y el abdomen se redujo bastante. ¡Lo recomiendo para todas!"'],
  ['Fernanda — Perdeu 12kg (Sem impacto)', 'Fernanda — Perdió 12kg (Sin impacto)'],
  ['"Com minha rotina corrida de mãe e trabalho, treinar 15 minutos por dia salvou minha saúde. O método sem impacto cuidou das minhas articulações, já que eu sentia dores no joelho."', '"Con mi rutina agitada de madre y trabajo, entrenar 15 minutos al día salvó mi salud. El método sin impacto cuidó mis articulaciones, ya que sentía dolores en la rodilla."'],
  ['Juliana — Perdeu 8kg após a gravidez', 'Juliana — Perdió 8kg después del embarazo'],
  ['"Depois da gravidez, foi a única coisa que funcionou para mim voltar ao meu corpo de antes. A flexibilidade do programa é incrível e o aplicativo é muito fácil de usar."', '"Después del embarazo, fue lo único que me funcionó para volver a mi cuerpo anterior. La flexibilidad del programa es increíble y la app es muy fácil de usar."'],
  ['🔥 Vagas promocionais limitadas!', '🔥 ¡Plazas promocionales limitadas!'],
  ['Sim! Quero garantir meu plano', '¡Sí! Quiero asegurar mi plan'],
  ['30 Dias de Garantia Incondicional', '30 Días de Garantía Incondicional'],
  ['Se você aplicar o método e por qualquer motivo achar que não é para você, basta nos enviar um email e devolvemos 100% do seu dinheiro, centavo por centavo. Simples assim, risco zero!', 'Si aplicas el método y por cualquier motivo sientes que no es para ti, solo envíanos un email y te devolvemos el 100% de tu dinero, centavo a centavo. ¡Así de simple, riesgo cero!'],
  ['Dúvidas Frequentes', 'Preguntas Frecuentes'],
  ['1. Preciso de equipamentos?', '1. ¿Necesito equipos?'],
  ['Não! Todo o programa foi desenvolvido usando apenas o peso do seu próprio corpo. Você pode fazer tudo na sua sala ou no quarto.', '¡No! Todo el programa fue desarrollado usando solo el peso de tu propio cuerpo. Puedes hacer todo en tu sala o en tu habitación.'],
  ['2. É seguro para quem sente dores?', '2. ¿Es seguro para quien siente dolores?'],
  ['Sim. A Calistenia Asiática utiliza movimentos focados e sem impacto, o que poupa suas articulações como joelhos e coluna.', 'Sí. La Calistenia Asiática utiliza movimientos enfocados y sin impacto, lo que cuida tus articulaciones como rodillas y columna.'],
  ['3. O pagamento é mensalidade?', '3. ¿El pago es mensual?'],
  ['Não! É um pagamento único de R$ 37,90. Você paga uma vez e tem acesso vitalício ao programa.', '¡No! Es un pago único de R$ 37,90. Pagas una vez y tienes acceso vitalicio al programa.'],
  ['Garantir meu acesso agora', 'Asegurar mi acceso ahora'],
  ['Compra segura | SSL | Risco Zero', 'Compra segura | SSL | Riesgo Cero'],

  // ── Generic common words ─────────────────────────────────────────────────
  ['Mulheres transformadas', 'Mujeres transformadas'],
  ['Calistenia Transformação', 'Calistenia Transformación'],
  ['Aplicativo no celular', 'Aplicación en el celular'],
  ['Garantia', 'Garantía'],
  ['Mulher calistenia', 'Mujer calistenia'],
  ['Mulheres', 'Mujeres'],
  ['mulheres', 'mujeres'],
  ['para Mulheres', 'para Mujeres'],
  
  // Generic step headings that repeat
  ['Vamos personalizar seu plano?', '¿Vamos a personalizar tu plan?'],
  ['Quase lá!', '¡Casi ahí!'],
  ['Calculando seu plano personalizado', 'Calculando tu plan personalizado'],
];

// ─── Helper: apply all translations ─────────────────────────────────────────
function translate(content) {
  let result = content;
  for (const [pt, es] of dict) {
    // Replace all occurrences
    result = result.split(pt).join(es);
  }
  return result;
}

// ─── Helper: fix paths for /es/ subfolder ────────────────────────────────────
// index.html is at root level in /es/ so needs to point to /es/pages/ for steps
// pages/stepN.html are at /es/pages/ level so ../css and ../js already work
// We only need to adjust the index.html paths
function fixIndexPaths(content) {
  // In /es/index.html, links to pages/stepN.html should stay relative
  // CSS and image references: the /es/index.html needs ../css -> ./css since we copied css into es/
  // Actually since we copied css/js/images into es/, paths stay the same
  return content;
}

// ─── PROCESS all HTML files ───────────────────────────────────────────────────
let processedCount = 0;

// 1. Process index.html → es/index.html
const indexContent = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
let esIndex = translate(indexContent);
// Fix skeleton links: pages/step2.html → pages/step2.html (same structure in es/)
fs.writeFileSync(path.join(ROOT, 'es', 'index.html'), esIndex, 'utf8');
processedCount++;
console.log('✓ es/index.html');

// 2. Process all pages/*.html → es/pages/*.html
const pagesDir = path.join(ROOT, 'pages');
const esPages = path.join(ROOT, 'es', 'pages');

const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
for (const file of pageFiles) {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const translated = translate(content);
  fs.writeFileSync(path.join(esPages, file), translated, 'utf8');
  processedCount++;
  console.log(`✓ es/pages/${file}`);
}

console.log(`\n✅ Total: ${processedCount} arquivos traduzidos para espanhol!`);
