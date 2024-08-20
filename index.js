const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/application', (req, res) => {
    const {idNumber, loanAmount, term } = req.body;

    console.log(req.body);

    const annualRate = 8;
    const monthlyRate = annualRate / 100 / 12;

    const numberOfPayments = parseInt(term);
    const loanAmountFloat = parseFloat(loanAmount);

    
        const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
        const monthlyPayment = (loanAmountFloat * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / denominator;

        return res.json({
            status: "Application Submitted",
            idNumber:idNumber,
            loanAmount: `R${loanAmountFloat.toFixed(2)}`,
            term: `${term} months`,
            annualInterestRate: `${annualRate}%`,
            monthlyPayment: `R${monthlyPayment.toFixed(2)}`
        });

        return res.status(400).json({
            error: 'Please fill in all fields correctly.'
        });
    
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

