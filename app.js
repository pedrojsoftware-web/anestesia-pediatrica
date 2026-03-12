document.addEventListener('DOMContentLoaded', () => {
    const pesoInput = document.getElementById('peso');
    const edadMesesInput = document.getElementById('edadMeses');
    const edadAnosInput = document.getElementById('edadAnos');

    // Todos los elementos a actualizar
    const els = {
        // Via Aerea
        tuboEndo: document.getElementById('tuboEndo'),
        mascarillaLaringea: document.getElementById('mascarillaLaringea'),
        volumenMax: document.getElementById('volumenMax'),

        // Premedicacion
        midaImMg: document.getElementById('midaImMg'), midaImMl: document.getElementById('midaImMl'),
        atroImMg: document.getElementById('atroImMg'), atroImMl: document.getElementById('atroImMl'),
        ketaImMg: document.getElementById('ketaImMg'), ketaImMl: document.getElementById('ketaImMl'),
        midaOralMg: document.getElementById('midaOralMg'), midaOralMl: document.getElementById('midaOralMl'),
        atroIvMl: document.getElementById('atroIvMl'), atroIvEstrabMl: document.getElementById('atroIvEstrabMl'),

        // Profilaxis 
        urbasonMg: document.getElementById('urbasonMg'), urbasonMl: document.getElementById('urbasonMl'),
        ranitidinaMg: document.getElementById('ranitidinaMg'), ranitidinaMl: document.getElementById('ranitidinaMl'),
        polaramineMg: document.getElementById('polaramineMg'), polaramineMl: document.getElementById('polaramineMl'),

        // Induccion
        propofolMgMin: document.getElementById('propofolMgMin'), propofolMgMax: document.getElementById('propofolMgMax'),
        propofolMlMin: document.getElementById('propofolMlMin'), propofolMlMax: document.getElementById('propofolMlMax'),
        ketaIndMgMin: document.getElementById('ketaIndMgMin'), ketaIndMgMax: document.getElementById('ketaIndMgMax'),
        ketaIndMlMin: document.getElementById('ketaIndMlMin'), ketaIndMlMax: document.getElementById('ketaIndMlMax'),
        midaIndMgMin: document.getElementById('midaIndMgMin'), midaIndMgMax: document.getElementById('midaIndMgMax'),
        midaIndMlMin: document.getElementById('midaIndMlMin'), midaIndMlMax: document.getElementById('midaIndMlMax'),

        // Opiaceos
        fentaMcgMin: document.getElementById('fentaMcgMin'), fentaMcgMax: document.getElementById('fentaMcgMax'),
        fentaMlMin: document.getElementById('fentaMlMin'), fentaMlMax: document.getElementById('fentaMlMax'),
        remiMlHMin: document.getElementById('remiMlHMin'), remiMlHMax: document.getElementById('remiMlHMax'),

        // Relajantes
        rocuMgMin: document.getElementById('rocuMgMin'), rocuMgMax: document.getElementById('rocuMgMax'),
        rocuMlMin: document.getElementById('rocuMlMin'), rocuMlMax: document.getElementById('rocuMlMax'),
        cisaMg: document.getElementById('cisaMg'), cisaMl: document.getElementById('cisaMl'),
        atraMgMin: document.getElementById('atraMgMin'), atraMgMax: document.getElementById('atraMgMax'),
        atraMlMin: document.getElementById('atraMlMin'), atraMlMax: document.getElementById('atraMlMax'),

        // Antiemeticos
        zofranMg: document.getElementById('zofranMg'), zofranMl: document.getElementById('zofranMl'),
        forteMg: document.getElementById('forteMg'), forteMl: document.getElementById('forteMl'),

        // Reversion
        prostigminaMg: document.getElementById('prostigminaMg'), prostigminaMl: document.getElementById('prostigminaMl'),
        atroRevMg: document.getElementById('atroRevMg'), atroRevMl: document.getElementById('atroRevMl'),
        suga2Mg: document.getElementById('suga2Mg'), suga4Mg: document.getElementById('suga4Mg'), suga16Mg: document.getElementById('suga16Mg'),

        // Analgesicos
        tramaMg: document.getElementById('tramaMg'), tramaMl: document.getElementById('tramaMl'),
        paraMg: document.getElementById('paraMg'), paraMl: document.getElementById('paraMl'),
        nolotilMg: document.getElementById('nolotilMg'), nolotilMl: document.getElementById('nolotilMl'),
        ketoMg: document.getElementById('ketoMg'), ketoMl: document.getElementById('ketoMl'),
        dolaMg: document.getElementById('dolaMg'), dolaMl: document.getElementById('dolaMl')
    };

    function updateValues() {
        const p = parseFloat(pesoInput.value);
        const meses = parseFloat(edadMesesInput.value) || 0;
        const anos = parseFloat(edadAnosInput.value) || 0;

        if (isNaN(p) || p <= 0) {
            clearValues();
            return;
        }

        // --- FUNCIONES AUXILIARES ---
        const setVal = (el, val, unit) => {
            el.textContent = `${val.toFixed(2)} ${unit}`;
            animateUpdate(el);
        };
        const calcMg = (peso, dosePerKg) => peso * dosePerKg;
        const calcMl = (peso, dosePerKg, concMgPerMl) => (peso * dosePerKg) / concMgPerMl;
        const calcMlFromMg = (mg, concMgPerMl) => mg / concMgPerMl;

        // --- VIA AEREA ---
        if (p > 3 && anos > 0) {
            let tubo = (anos / 4) + 4;
            els.tuboEndo.textContent = `Nº ${tubo.toFixed(1)} (sin neumotaponamiento)`;
        } else if (p > 3 && meses > 0) {
            els.tuboEndo.textContent = `Nº 3.5 - 4.0`;
        } else {
            els.tuboEndo.textContent = 'null';
        }

        // Mascarilla Laríngea (aproximación basada en peso)
        let mascara = '';
        let vol = 0;
        if (p < 5) { mascara = 'Tamaño 1'; vol = 4; }
        else if (p >= 5 && p < 10) { mascara = 'Tamaño 1 y medio'; vol = 7; }
        else if (p >= 10 && p <= 20) { mascara = 'Tamaño 2'; vol = 10; }
        else if (p > 20 && p <= 30) { mascara = 'Tamaño 2 y medio'; vol = 14; }
        else if (p > 30 && p <= 50) { mascara = 'Tamaño 3'; vol = 20; }
        else { mascara = 'Tamaño 4+'; vol = 30; }

        els.mascarillaLaringea.textContent = mascara;
        els.volumenMax.textContent = `${vol} ml`;

        // --- PREMEDICACION ---
        setVal(els.midaImMg, calcMg(p, 0.08), 'mg');
        setVal(els.midaImMl, calcMl(p, 0.08, 1), 'ml');

        setVal(els.atroImMg, calcMg(p, 0.015), 'mg');
        setVal(els.atroImMl, calcMl(p, 0.015, 1), 'ml');

        setVal(els.ketaImMg, calcMg(p, 5), 'mg');
        setVal(els.ketaImMl, calcMl(p, 5, 50), 'ml');

        setVal(els.midaOralMg, calcMg(p, 0.375), 'mg');
        setVal(els.midaOralMl, calcMl(p, 0.375, 2.5), 'ml');

        setVal(els.atroIvMl, calcMl(p, 0.01, 1), 'ml'); // asumiendo concentracion 1mg/ml para esta formula
        setVal(els.atroIvEstrabMl, calcMl(p, 0.015, 1), 'ml');

        // --- PROFILAXIS ALERGICA ---
        setVal(els.urbasonMg, calcMg(p, 0.5), 'mg');
        setVal(els.urbasonMl, calcMl(p, 0.5, 10), 'ml'); // 10mg/ml o 1ml reconstituido de 10mg

        setVal(els.ranitidinaMg, calcMg(p, 1), 'mg');
        setVal(els.ranitidinaMl, calcMl(p, 1, 10), 'ml'); // 10mg/ml segun foto 20mg=2ml

        setVal(els.polaramineMg, calcMg(p, 0.1), 'mg');
        setVal(els.polaramineMl, calcMl(p, 0.1, 5), 'ml'); // 5mg/ml segun foto 2mg=0.4ml

        // --- INDUCCION ---
        setVal(els.propofolMgMin, calcMg(p, 2.5), 'mg'); setVal(els.propofolMgMax, calcMg(p, 3), 'mg');
        setVal(els.propofolMlMin, calcMl(p, 2.5, 10), 'ml'); setVal(els.propofolMlMax, calcMl(p, 3, 10), 'ml'); // 10mg/ml

        setVal(els.ketaIndMgMin, calcMg(p, 1), 'mg'); setVal(els.ketaIndMgMax, calcMg(p, 2), 'mg');
        setVal(els.ketaIndMlMin, calcMl(p, 1, 50), 'ml'); setVal(els.ketaIndMlMax, calcMl(p, 2, 50), 'ml'); // 50mg/ml

        setVal(els.midaIndMgMin, calcMg(p, 0.1), 'mg'); setVal(els.midaIndMgMax, calcMg(p, 0.2), 'mg');
        setVal(els.midaIndMlMin, calcMl(p, 0.1, 1), 'ml'); setVal(els.midaIndMlMax, calcMl(p, 0.2, 1), 'ml'); // 1mg/ml

        // --- OPIACEOS ---
        setVal(els.fentaMcgMin, calcMg(p, 1), 'mcg'); setVal(els.fentaMcgMax, calcMg(p, 2), 'mcg');
        setVal(els.fentaMlMin, calcMl(p, 1, 50), 'ml'); setVal(els.fentaMlMax, calcMl(p, 2, 50), 'ml'); // 50mcg/ml

        // Remifentanilo 40mcg/ml. Rango: 0.2 - 0.5 mcg/kg/min = 12 - 30 mcg/kg/h
        const remiMinMcgH = p * 0.2 * 60;
        const remiMaxMcgH = p * 0.5 * 60;
        setVal(els.remiMlHMin, remiMinMcgH / 40, 'ml/h');
        setVal(els.remiMlHMax, remiMaxMcgH / 40, 'ml/h');

        // --- RELAJANTES MUSCULARES ---
        setVal(els.rocuMgMin, calcMg(p, 0.45), 'mg'); setVal(els.rocuMgMax, calcMg(p, 0.60), 'mg');
        setVal(els.rocuMlMin, calcMl(p, 0.45, 10), 'ml'); setVal(els.rocuMlMax, calcMl(p, 0.60, 10), 'ml');

        setVal(els.cisaMg, calcMg(p, 0.1), 'mg'); setVal(els.cisaMl, calcMl(p, 0.1, 2), 'ml');

        setVal(els.atraMgMin, calcMg(p, 0.30), 'mg'); setVal(els.atraMgMax, calcMg(p, 0.60), 'mg');
        setVal(els.atraMlMin, calcMl(p, 0.30, 10), 'ml'); setVal(els.atraMlMax, calcMl(p, 0.60, 10), 'ml');

        // --- ANTIEMETICOS ---
        setVal(els.zofranMg, calcMg(p, 0.1), 'mg'); setVal(els.zofranMl, calcMl(p, 0.1, 2), 'ml');
        setVal(els.forteMg, calcMg(p, 0.1), 'mg'); setVal(els.forteMl, calcMl(p, 0.1, 4), 'ml');

        // --- REVERSION RELAJANTES ---
        let prostigMg = Math.min(calcMg(p, 0.05), 2); // Max 2mg
        setVal(els.prostigminaMg, prostigMg, 'mg');
        setVal(els.prostigminaMl, calcMlFromMg(prostigMg, 0.5), 'ml'); // 0.5 mg/ml

        let atroRevMg = Math.min(calcMg(p, 0.025), 1); // Max 1mg
        setVal(els.atroRevMg, atroRevMg, 'mg');
        setVal(els.atroRevMl, calcMlFromMg(atroRevMg, 1), 'ml'); // 1 mg/ml

        setVal(els.suga2Mg, calcMg(p, 2), 'mg');
        setVal(els.suga4Mg, calcMg(p, 4), 'mg');
        setVal(els.suga16Mg, calcMg(p, 16), 'mg');

        // --- ANALGESICOS POSTOPERATORIO ---
        setVal(els.tramaMg, calcMg(p, 1.5), 'mg'); setVal(els.tramaMl, calcMl(p, 1.5, 50), 'ml');
        setVal(els.paraMg, calcMg(p, 10), 'mg'); setVal(els.paraMl, calcMl(p, 10, 10), 'ml');

        let nolotilMg = Math.min(calcMg(p, 15), 2000); // max 2000mg = 2g
        setVal(els.nolotilMg, nolotilMg, 'mg'); setVal(els.nolotilMl, calcMlFromMg(nolotilMg, 400), 'ml'); // 400 mg/ml

        setVal(els.ketoMg, calcMg(p, 0.5), 'mg'); setVal(els.ketoMl, calcMl(p, 0.5, 30), 'ml');

        let dolaMg = Math.min(calcMg(p, 0.5), calcMg(p, 1)); // foto: 10mg -> max 1mg/kg dudosamente redactado, dice "0.5mg/kg, max 1mg/kg". Se calcula 0.5
        setVal(els.dolaMg, calcMg(p, 0.5), 'mg'); setVal(els.dolaMl, calcMl(p, 0.5, 50), 'ml'); // 50mg/ml
    }

    function clearValues() {
        Object.values(els).forEach(el => {
            if (el && el.textContent) {
                if (el.id === 'tuboEndo' || el.id === 'mascarillaLaringea') {
                    el.textContent = '--';
                } else if (el.id === 'volumenMax') {
                    el.textContent = '-- ml';
                } else {
                    el.textContent = el.textContent.replace(/[\d.,]+/g, '--');
                }
            }
        });
    }

    function animateUpdate(el) {
        el.classList.remove('updated');
        void el.offsetWidth; // trigger reflow
        el.classList.add('updated');
    }

    pesoInput.addEventListener('input', updateValues);
    edadMesesInput.addEventListener('input', updateValues);
    edadAnosInput.addEventListener('input', updateValues);

    clearValues();
});
