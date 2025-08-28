console.log("Teste da função soma()");
if (soma(2, 2) === 4) console.log("Passou 1°")
    else console.log("Falhou 1°")
if (soma(-1, 2) === 1) console.log("Passou 2°")
    else console.log("Falhou 2°")
if (soma(2, 0) === 2) console.log("Passou 3°")
    else console.log("Falhou 3°")

console.log("Teste da função subtração()")

if (subtração(2, 2) === 0) console.log("Passou 1°")
    else console.log("Falhou 1°")
if (subtração(-1, 2) === -3) console.log("Passou 2°")
    else console.log("Falhou 2°")
if (subtração(2, 0) === 2) console.log("Passou 3°")
    else console.log("Falhou 3°")

console.log("Teste da função Divisão()")

if (divisão(2, 2) === 1) console.log("Passou 1°")
    else console.log("Falhou 1°")
if (divisão(-1, 2) === -0,5) console.log("Passou 2°")
    else console.log("Falhou 2°")
if (divisão(2, 2) === 1) console.log("Passou 3°")
    else console.log("Falhou 3°")


console.log("Teste da função Multiplicação()")

if (multiplicação(2, 2) === 4) console.log("Passou 1°")
    else console.log("Falhou 1°")
if (multiplicação(1, -2) === -2) console.log("Passou 2°")
    else console.log("Falhou 2°")
if (multiplicação(2, 3) === 6) console.log("Passou 3°")
    else console.log("Falhou 3°")


function soma(a,b){
    return a+b
}
function subtração(a,b){
    return a-b
}
function divisão(a,b){
    return a/b
}
function multiplicação(a,b){
    return a*b
}


export { soma, subtração, multiplicação, divisão };