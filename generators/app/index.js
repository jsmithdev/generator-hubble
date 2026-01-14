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
				type: "string",
				name: "packageName",
				message: "What's the name of the project?",
			},
			{
				type: "string",
				name: "elementName",
				message: "What's the name of the element?",
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
			{
				type: "confirm",
				name: "areYouSure",
				message: `Are you sure you want to create the project in the current directory?`,
				default: true
			},
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		})
	}

  	writing() {

		if(this.props.areYouSure) {
			this.log( chalk.blue(`🎉 Copying files...`) )
			this.fs.copyTpl(
				this.templatePath(),
				this.destinationPath(),
				this.props,
			);
		}
		else {
			this.log( chalk.red(`🔥 Canceling ${this.props.packageName}...`) )
		}
	}

	async install(){
		try {


			if(!this.props.areYouSure) return undefined;

			this.log( chalk.green(`🎉 Created ${this.props.packageName}...`) )

			this.log( `${chalk.blue(`📚 Installing dependencies...`)}` )

			await execute(`npm i`);

			this.log( `${chalk.green(`📚 Installed dependencies...`)}` )

			this.log(`🚀 Happy Hubbles` )
		}
		catch (error) {
			this.log( `🔥 ${chalk.red(`Error Installing: ${error.message}`)}` )
		}
	}
}