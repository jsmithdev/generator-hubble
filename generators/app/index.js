import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

import { exec } from 'child_process';
import { promisify } from 'util';
const execute = promisify(exec);


export default class extends Generator {
  	prompting() {
		
		this.log(
			yosay( `Welcome to the ${chalk.blue("hubble")} generator!` )
		);


		const prompts = [
			{
				type: "confirm",
				name: "areYouSure",
				message: `Would you like to create the project in the current directory?`,
				default: true
			},
			{
				type: "string",
				name: "packageName",
				message: "What's the name of the project?",
			},
			{
				type: "string",
				name: "elementName",
				message: "What's the name of the element?",
				default: this.props.packageName.replace('hubble-', '')
			},
			{
				type: "string",
				name: "description",
				message: "What's the description of the project?",
			},
			{
				type: "string",
				name: "authorName",
				message: "What's the author's name?",
			},
			{
				type: "string",
				name: "gitUserName",
				message: "What's the author's GitHub username?",
			},
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		})
	}

  	writing() {
		if(this.props.areYouSure) {

			
			const NON_TPLS = [
				'artifacts',
				'build',
				'resources/icon.svg',
				'src/hello-world.ts',
				'src/tailwind.css',
				'.gitignore',
				'rollup.config.js',
				'tailwind.config.js',
				'typings.d.ts',
			  ];

			  const TPLS = [
				'_index.html',
				'_package.json',
				'_README.md',
			  ];
		  
			  NON_TPLS.map((n) => {
				return this.fs.copy(
				  this.templatePath(n),
				  this.destinationPath(n),
				  this.props);
			  });
		  
			  TPLS.map((n) => {
				return this.fs.copyTpl(
				  this.templatePath(n),
				  this.destinationPath(n.replace(/(_)/gi, '')),
				  this.props);
			  });
		}
		else {
			this.log( chalk.red(`🔥 Canceling ${this.props.name}...`) )
		}
	}

	async install(){
		try {


			if(!this.props.areYouSure) return undefined;

			this.log( chalk.green(`🎉 Created ${this.props.name} and copied files...`) )

			this.log( `${chalk.blue(`📚 Installing dependencies...`)}` )

			await execute(`cd ${this.props.name} && npm i`);

			this.log( `${chalk.green(`📚 Installed dependencies...`)}` )

			this.log()
			this.log(`${chalk.blue(`cd ${this.props.name} && npm start`)}` )
			this.log(`🚀 Run above to go to your new project and start it up` )
			this.log()
		}
		catch (error) {
			this.log( `🔥 ${chalk.red(`Error Installing: ${error.message}`)}` )
		}
	}
}