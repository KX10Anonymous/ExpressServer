const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const calculateInterestRate = (idNumber) => {
    if (idNumber.length >= 6) {
        const year = idNumber.substring(0, 2);
        const month = idNumber.substring(2, 4);
        const day = idNumber.substring(4, 6);
        const currentYear = new Date().getFullYear();
        const fullYear = parseInt(year) > currentYear % 100 ? `19${year}` : `20${year}`;
        
        const birthDateObj = new Date(parseInt(fullYear), parseInt(month) - 1, parseInt(day));
        let age = currentYear - birthDateObj.getFullYear();
        const monthDiff = new Date().getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthDateObj.getDate())) {
            age--;
        }
        
        let annualRate = 8;

        if (age < 35) {
            annualRate += 2;
        } else if (age < 60) {
            annualRate += 1.5;
        }

        return { age, annualRate };
    }
    return null;
};

app.post('/application', (req, res) => {
    const {idNumber, loanAmount, term } = req.body;

    const { age, annualRate } = calculateInterestRate(idNumber) || {};

    if (age === undefined || !loanAmount || !term || isNaN(parseFloat(loanAmount)) || isNaN(parseInt(term))) {
        return res.status(400).json({
            error: 'Please fill in all fields correctly.'
        });
    }

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = parseInt(term);
    const loanAmountFloat = parseFloat(loanAmount);

    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
    const monthlyPayment = (loanAmountFloat * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / denominator;

    return res.json({
        status: "Application Submitted",
        age: age,
        loanAmount: `R${loanAmountFloat.toFixed(2)}`,
        term: `${term} months`,
        annualInterestRate: `${annualRate}%`,
        monthlyPayment: `R${monthlyPayment.toFixed(2)}`
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
<<<<<<< HEAD
=======

>>>>>>> 86056a35d64b1955a73f75c3837be5c035d3998e
