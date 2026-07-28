const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app', 'src', 'data', 'workouts.js');
let content = fs.readFileSync(file, 'utf8');

let dataString = content.replace('export const weeks = ', 'return ');
let getWeeks = new Function(dataString);
let weeks = getWeeks();

weeks.forEach(week => {
  let duration = "";
  if (week.id === 1) duration = "30s";
  else if (week.id === 2) duration = "40s";
  else if (week.id === 3) duration = "45s";

  if (duration) {
    week.days.forEach(day => {
      if (day.exercises) {
        day.exercises.forEach(ex => {
          ex.reps = duration;
        });
      }
    });
  }
});

let newContent = '// data/workouts.js\n// Lista genérica de treinos focada em Calistenia Asiática (21 dias)\n\nexport const weeks = ' + JSON.stringify(weeks, null, 2) + ';\n';
fs.writeFileSync(file, newContent, 'utf8');
console.log('Durations updated successfully!');
