const contacts = require('./contacts.js');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const listContact = await contacts.listContacts();
          return console.log(listContact);
      break;

    case 'get':
          const getContact = await contacts.getContactById(id);
           return console.log(getContact);
      break;

    case 'add':
          const newContact = await contacts.addContact(name, email, phone);
          return console.log(newContact);
      break;

    case 'remove':
          const delContact = await contacts.removeContact(id);
          return console.log(delContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);