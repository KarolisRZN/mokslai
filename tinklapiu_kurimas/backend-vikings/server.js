const express = require('express');
const { Soldier, Viking, Saxon } = require('./viking');
require('dotenv').config();

const PORT = process.env.PORT 

const app = express();
app.use(express.json());

app.post('/soldier', (req, res) => {
  const { health, strength } = req.body;
  const soldier = new Soldier(health, strength);
  res.json(soldier);
});

app.post('/viking', (req, res) => {
  const { name, health, strength } = req.body;
  const viking = new Viking(name, health, strength);
  res.json(viking);
});

app.post('/saxon', (req, res) => {
  const { health, strength } = req.body;
  const saxon = new Saxon(health, strength);
  res.json(saxon);
});

app.post('/attack', (req, res) => {
  const { attackerType, attackerProps, defenderType, defenderProps } = req.body;

  let attacker, defender;

  switch (attackerType) {
    case 'Soldier':
      attacker = new Soldier(attackerProps.health, attackerProps.strength);
      break;
    case 'Viking':
      attacker = new Viking(attackerProps.name, attackerProps.health, attackerProps.strength);
      break;
    case 'Saxon':
      attacker = new Saxon(attackerProps.health, attackerProps.strength);
      break;
    default:
      return res.status(400).json({ error: 'Invalid attacker type' });
  }

  switch (defenderType) {
    case 'Soldier':
      defender = new Soldier(defenderProps.health, defenderProps.strength);
      break;
    case 'Viking':
      defender = new Viking(defenderProps.name, defenderProps.health, defenderProps.strength);
      break;
    case 'Saxon':
      defender = new Saxon(defenderProps.health, defenderProps.strength);
      break;
    default:
      return res.status(400).json({ error: 'Invalid defender type' });
  }

  const damage = attacker.attack();
  const result = defender.receiveDamage(damage);
  res.json({ damage, result });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});