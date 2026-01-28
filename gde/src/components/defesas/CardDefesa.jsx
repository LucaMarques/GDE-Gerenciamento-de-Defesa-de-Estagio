"use client";

export default function CardDefesa({ defesa, atualizarStatus }) {
    return (
        <div className="card-defesa">
            <h3 className="card-titulo">{defesa.tema}</h3>

            <p className="card-info">
                <strong>Aluno:</strong>{" "}
                {defesa.aluno?.nome_completo ?? "Aluno não encontrado"}
            </p>

            <p className="card-info">
                <strong>Status:</strong> {defesa.status}
            </p>

            <div className="card-botoes">
                <button
                    className="botao aceitar"
                    onClick={() => atualizarStatus(defesa, "Em andamento")}
                >
                    Aceitar
                </button>

                <button
                    className="botao recusar"
                    onClick={() => atualizarStatus(defesa, "Recusado")}
                >
                    Recusar
                </button>
            </div>
        </div>
    );
}
