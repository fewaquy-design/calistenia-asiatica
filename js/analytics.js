/**
 * ═══════════════════════════════════════════════════════════════════
 *  Analytics Module — Calistenia Asiática
 *  Rastreia eventos e os envia ao Firebase Realtime Database
 * ═══════════════════════════════════════════════════════════════════
 */

(function () {

    // ────────────────────────────────────────────────────────────────
    // ⚙️ CONFIGURAÇÃO — substitua com a URL do seu Firebase
    // ────────────────────────────────────────────────────────────────
    var FIREBASE_DATABASE_URL = 'https://gelatina-mounjaro-default-rtdb.firebaseio.com/';

    // ────────────────────────────────────────────────────────────────
    //  Mapeamento: ID do step → Nome legível (para o dashboard)
    // ────────────────────────────────────────────────────────────────
    var STEP_NAMES = {
        'index': 'Tela Inicial',
        'step1': 'Passo 1',
        'step2': 'Passo 2',
        'step3': 'Passo 3',
        'step4-sim': 'Passo 4 - Sim',
        'step4-nao': 'Passo 4 - Não',
        'step5': 'Passo 5',
        'step6': 'Passo 6',
        'step7': 'Passo 7',
        'step8': 'Passo 8',
        'step9': 'Passo 9',
        'step10': 'Passo 10',
        'step11': 'Passo 11',
        'step12': 'Passo 12',
        'step13': 'Passo 13',
        'step14': 'Passo 14',
        'step15': 'Passo 15',
        'step16': 'Passo 16',
        'step17': 'Passo 17',
        'step18': 'Passo 18',
        'step19': 'Passo 19',
        'step20': 'Passo 20',
        'step21': 'Passo 21',
        'step22': 'Passo 22',
        'step23': 'Passo 23',
        'step24': 'Passo 24',
        'step25': 'Passo 25',
        'step26': 'Passo 26',
        'step27': 'Passo 27',
        'step28': 'Passo 28',
        'step29': 'Passo 29',
        'step30': 'Passo 30',
        'step31': 'Passo 31',
        'step32': 'Passo 32',
        'step33': 'Passo 33',
        'step34': 'Passo 34 - Loading Final',
        'step35': 'Passo 35 - Vídeo VSL',
    };

    var STEP_ORDER = [
        'index',
        'step1', 'step2', 'step3', 'step4-sim', 'step4-nao', 'step5', 'step6', 'step7', 'step8', 'step9',
        'step10', 'step11', 'step12', 'step13', 'step14', 'step15', 'step16', 'step17', 'step18', 'step19',
        'step20', 'step21', 'step22', 'step23', 'step24', 'step25', 'step26', 'step27', 'step28', 'step29',
        'step30', 'step31', 'step32', 'step33', 'step34', 'step35'
    ];

    function isConfigured() {
        return !FIREBASE_DATABASE_URL.includes('SEU-PROJETO');
    }

    function getOrCreateSessionId() {
        var key = 'calistenia_session_id';
        var id = sessionStorage.getItem(key);
        if (!id) {
            id = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem(key, id);
        }
        return id;
    }

    function getCurrentPage() {
        var path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    }

    function pushToFirebase(data) {
        if (!isConfigured()) {
            console.warn('[QuizAnalytics] Firebase não configurado. Evento ignorado:', data.event);
            return;
        }
        fetch(FIREBASE_DATABASE_URL + '/calistenia_eventos.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(function (err) {
            console.warn('[QuizAnalytics] Falha ao enviar evento:', err.message);
        });
    }

    window.QuizAnalytics = {
        STEP_NAMES: STEP_NAMES,
        STEP_ORDER: STEP_ORDER,

        track: function (event, extra) {
            var payload = Object.assign({
                event: event,
                sessionId: getOrCreateSessionId(),
                timestamp: Date.now(),
                page: getCurrentPage()
            }, extra || {});
            pushToFirebase(payload);
        },

        saveLead: function (leadData) {
            var dataToSave = leadData;
            if (!dataToSave) {
                dataToSave = {};
                for (var i = 0; i < localStorage.length; i++) {
                    var k = localStorage.key(i);
                    if (k !== 'calistenia_session_id' && k !== 'dash_auth') {
                        dataToSave[k] = localStorage.getItem(k);
                    }
                }
            }
            
            // Identifica conclusão ou abandono
            var currentPage = getCurrentPage();
            dataToSave['Última Página'] = currentPage;
            if (currentPage.includes('step34') || currentPage.includes('step35') || currentPage.includes('truquedacolher')) {
                dataToSave['Status do Quiz'] = 'Concluído';
            } else {
                dataToSave['Status do Quiz'] = 'Abandonado (Incompleto)';
            }

            var sanitizedData = {};
            for (var key in dataToSave) {
                if (dataToSave.hasOwnProperty(key)) {
                    var safeKey = key.replace(/[.#$\[\]\/]/g, '');
                    sanitizedData[safeKey] = dataToSave[key];
                }
            }
            
            var payload = Object.assign({
                sessionId: getOrCreateSessionId(),
                timestamp: Date.now()
            }, sanitizedData);

            if (!isConfigured()) return;

            var sid = getOrCreateSessionId();
            fetch(FIREBASE_DATABASE_URL + '/calistenia_leads/' + sid + '.json', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true
            }).catch(function (err) {
                console.warn('[QuizAnalytics] Falha ao salvar lead:', err.message);
            });
        },

        fetchAllEvents: function () {
            if (!isConfigured()) {
                return Promise.resolve({});
            }
            return fetch(FIREBASE_DATABASE_URL + '/calistenia_eventos.json')
                .then(function (r) { return r.json(); })
                .then(function (data) { return data || {}; })
                .catch(function (err) {
                    console.error('[QuizAnalytics] Erro ao ler eventos:', err);
                    return {};
                });
        },

        clearAllEvents: function () {
            if (!isConfigured()) return Promise.resolve();
            return fetch(FIREBASE_DATABASE_URL + '/calistenia_eventos.json', { method: 'DELETE' })
                .catch(function (err) {
                    console.error('[QuizAnalytics] Erro ao limpar eventos:', err);
                });
        },

        fetchAllLeads: function () {
            if (!isConfigured()) return Promise.resolve({});
            return fetch(FIREBASE_DATABASE_URL + '/calistenia_leads.json')
                .then(function (r) { return r.json(); })
                .then(function (data) { return data || {}; })
                .catch(function (err) {
                    console.error('[QuizAnalytics] Erro ao ler leads:', err);
                    return {};
                });
        },

        isConfigured: isConfigured
    };

    // Auto-track the page view when this script loads on any step
    var filename = getCurrentPage().replace('.html', '');
    if (filename === '') filename = 'index';
    window.QuizAnalytics.track('step_view', { stepId: filename });
    
    // Auto-save lead incrementally
    window.QuizAnalytics.saveLead();

    // Auto-capture quiz answers dynamically
    document.addEventListener('click', function(e) {
        try {
            var target = e.target.closest('a') || e.target.closest('button') || e.target.closest('.option-card');
            if (!target) return;
            
            var cls = target.className || '';
            var isNextBtn = cls.includes('btn-pink') || cls.includes('next-btn') || target.innerText.toLowerCase().includes('próximo') || target.innerText.toLowerCase().includes('continuar');
            
            var isSingleOption = !isNextBtn && !cls.includes('option-multi') && (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                cls.includes('option-') ||
                cls.includes('card-') ||
                cls.includes('btn')
            );
            
            var h1 = document.querySelector('h1');
            var question = h1 ? h1.innerText.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim() : '';
            if (!question) return; // Se não tem pergunta na tela, ignora.

            if (isSingleOption) {
                var answer = target.innerText.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
                if (!answer) {
                    var img = target.querySelector('img');
                    if (img && img.alt) answer = img.alt;
                }
                if (answer) {
                    localStorage.setItem(question, answer);
                    window.QuizAnalytics.saveLead();
                }
            } else if (isNextBtn) {
                var hasAnswer = false;
                var requiresAnswer = false;

                // Multi-select options
                var multiSelectContainers = document.querySelectorAll('.option-multi, .card-item, .item-option');
                if (multiSelectContainers.length > 0) {
                    requiresAnswer = true;
                    var selectedOptions = document.querySelectorAll('.option-multi.selected, .card-item.selected, .item-option.selected');
                    if (selectedOptions.length > 0) {
                        hasAnswer = true;
                        var answers = Array.from(selectedOptions).map(function(opt) {
                            var text = opt.innerText.trim().replace(/\s+/g, ' ');
                            if (!text) {
                                var img = opt.querySelector('img');
                                if (img && img.alt) text = img.alt;
                            }
                            return text;
                        }).filter(Boolean);
                        
                        if (answers.length > 0) {
                            localStorage.setItem(question, answers.join(', '));
                            window.QuizAnalytics.saveLead();
                        }
                    }
                }
                
                // Inputs (text, number)
                var inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea');
                if (inputs.length > 0) {
                    requiresAnswer = true;
                    inputs.forEach(function(input) {
                        if (input.value && input.value.trim() !== '' && input.type !== 'radio' && input.type !== 'checkbox') {
                            hasAnswer = true;
                            var key = input.id || input.name || question;
                            localStorage.setItem(key, input.value);
                            window.QuizAnalytics.saveLead();
                        } else if ((input.type === 'radio' || input.type === 'checkbox') && input.checked) {
                            hasAnswer = true;
                            var key = input.name || question;
                            localStorage.setItem(key, input.value);
                            window.QuizAnalytics.saveLead();
                        }
                    });
                }

                // VALIDAÇÃO: Se exige resposta e não foi preenchido
                if (requiresAnswer && !hasAnswer) {
                    e.preventDefault();
                    e.stopPropagation();
                    alert('Por favor, preencha ou selecione uma opção para continuar.');
                    return;
                }
            }
        } catch (err) {
            console.warn('[QuizAnalytics] Erro ao auto-capturar resposta:', err);
        }
    }, true);

})();
