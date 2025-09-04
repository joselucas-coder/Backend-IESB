const { calcularMediaAluno } = require('../src/calcularMediaAluno.js');

describe('calculaMediaAluno', () => {

  it("deve dar erro se a1 ou a2 não forem passados", () => {
    expect(() => calcularMediaAluno(10, undefined)).toThrow("a1 ou a2 não informadas");
    expect(() => calcularMediaAluno(undefined, undefined)).toThrow("a1 ou a2 não informadas");
    expect(() => calcularMediaAluno()).toThrow("a1 ou a2 não informadas");
  });

  it("deve dar erro se a1 ou a2 forem negativas", () => {
    expect(() => calcularMediaAluno(-5, 10)).toThrow("a1 ou a2 não podem ser negativas");
     expect(() => calcularMediaAluno(undefined, undefined)).toThrow("a1 ou a2 não informadas");
    expect(() => calcularMediaAluno()).toThrow("a1 ou a2 não informadas"); 
  });

  it("deve dar erro se a3 for negativa", () => {
    expect(() => calcularMediaAluno(10, 10, -1)).toThrow("a3 não pode ser negativa");
    expect(() => calcularMediaAluno(8, 7, -0.5)).toThrow("a3 não pode ser negativa");
    expect(() => calcularMediaAluno(0, 0, -10)).toThrow("a3 não pode ser negativa");
    expect(() => calcularMediaAluno(5, 5, -99)).toThrow("a3 não pode ser negativa");
  });


  it("deve calcular a média normal quando a3 não existe", () => {
    expect(calcularMediaAluno(7, 8)).toBeCloseTo(7.6);
     expect(calcularMediaAluno(10, 10)).toBeCloseTo(10);
     expect(calcularMediaAluno(0, 10)).toBeCloseTo(6);
  });

  it("deve usar a3 para aumentar a média (substituindo a1)", () => {
    expect(calcularMediaAluno(5, 8, 9)).toBeCloseTo(8.4);
    expect(calcularMediaAluno(0, 10, 8)).toBeCloseTo(9.2);
    expect(calcularMediaAluno(6.5, 8,9.5)).toBeCloseTo(8.6);
  });

  it("deve usar a3 para aumentar a média (substituindo a2)", () => {
    expect(calcularMediaAluno(8, 5, 9)).toBeCloseTo(8.6);
    expect(calcularMediaAluno(10, 0, 8)).toBeCloseTo(8.8);
    expect(calcularMediaAluno(8, 6.5, 9.5)).toBeCloseTo(8.9);
  });

});