# .bashrc

GREEN="\033[1;32m"
RED="\033[1;31m"

BOLD="\033[1;37m"
NORMAL="\033[0m"

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi


#Java
export JAVA_HOME=/usr/lib/jvm/java-1.8.0

## If we want a proxy
export http_proxy=http://localhost:3128
export https_proxy=http://localhost:3128
## And for npm, I need to figure out a way to specify this for only certain machines
npm config set proxy http://localhost:3128
npm config set https-proxy http://localhost:3128


# Prompt time

source git-prompt
USER="\u"
TIME="\t"
DIR="\[$BOLD\]\W\[$NORMAL\]"
SEPERATOR="\[$BOLD\]\$\[$NORMAL\]"

function git_color {
  local git_status="$(git status 2> /dev/null)"

  if [[ ! $git_status =~ "working directory clean" ]]; then
    echo -e $RED
  else
    echo -e $GREEN
  fi
}

PS1="$TIME $DIR"
PS1+="\[\$(git_color)\]"
PS1+="\$(__git_ps1) "
PS1+="\[$NORMAL\]"
PS1+="$SEPERATOR " 
