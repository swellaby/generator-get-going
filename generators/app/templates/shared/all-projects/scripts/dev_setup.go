package main

import (
	"fmt"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"runtime"
)

func installTaskRunner() {
	cmd := exec.Command("go", "get", "-v", "<%= taskRunnerConfig.packageInstallPath %>")
	cmd.Dir = os.TempDir()
	out, err := cmd.CombinedOutput()

	if err != nil {
		fmt.Printf("An error occurred while installing <%= taskRunnerConfig.name %> %s\n", err)
		fmt.Printf("Error details: %s\n", string(out))
		os.Exit(1)
	} else {
		fmt.Println("<%= taskRunnerConfig.name %> successfully installed.")
	}
}

func runSetupTarget() {
	cmd := exec.Command("<%= taskRunnerConfig.commandName %>", "<%= taskRunnerConfig.taskScriptNames.setup %>")
	_, currentFilePath, _, _ := runtime.Caller(0)
	cmd.Dir = filepath.Join(path.Dir(currentFilePath), "..")
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error encountered while running `<%= taskRunnerConfig.commandName %> <%= taskRunnerConfig.taskScriptNames.setup %>`. Error details: %s\n", err)
		os.Exit(1)
	}
	fmt.Printf("%s", string(out))
	os.Exit(0)
}

func main() {
	fmt.Println("Ensuring <%= taskRunnerConfig.name %> is installed and available...")
	installTaskRunner()
	fmt.Println("Running `<%= taskRunnerConfig.commandName %> <%= taskRunnerConfig.taskScriptNames.setup %>` to configure workspace...")
	runSetupTarget()
}
