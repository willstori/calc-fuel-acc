function calcularCombustivel() {
    // Capturar os valores dos campos
    const duracao = parseFloat(document.getElementById('duracao').value) || 0; // Duração em minutos
    const voltaMin = parseInt(document.getElementById('voltaMin').value) || 0; // Tempo de volta em min
    const voltaSeg = parseInt(document.getElementById('voltaSeg').value) || 0; // Tempo de volta em seg
    const consumo = parseFloat(document.getElementById('consumo').value) || 0; // Consumo em litros por volta
    const tolerancia = parseFloat(document.getElementById('tolerancia').value) || 0; // Tolerância em %

    // Verificar se os campos estão preenchidos corretamente
    if (duracao <= 0 || !voltaMin || !voltaSeg || consumo <= 0) {
        document.getElementById('combustivel').value = '';
        return;
    }

    // Converter tempo de volta para segundos
    const tempoVoltaSegundos = (voltaMin || 0) * 60 + (voltaSeg || 0);

    if (tempoVoltaSegundos <= 0) {
        document.getElementById('combustivel').value = '';
        return;
    }

    // Calcular o número de voltas
    const duracaoSegundos = duracao * 60;
    const voltas = duracaoSegundos / tempoVoltaSegundos;

    // Calcular o combustível necessário
    let combustivel = voltas * consumo;

    // Adicionar a tolerância
    combustivel += combustivel * (tolerancia / 100);

    // Exibir o resultado no campo "combustivel"
    document.getElementById('combustivel').value = combustivel.toFixed(2) + ' L';
}

// Adicionar event listeners aos campos para calcular em tempo real
document.getElementById('duracao').addEventListener('input', calcularCombustivel);
document.getElementById('voltaMin').addEventListener('input', calcularCombustivel);
document.getElementById('voltaSeg').addEventListener('input', calcularCombustivel);
document.getElementById('consumo').addEventListener('input', calcularCombustivel);
document.getElementById('tolerancia').addEventListener('input', calcularCombustivel);