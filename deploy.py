import os
comandDeploy = "git push production "
branch_to_deploy = input ("Enter the branch to deploy: ")
if branch_to_deploy == "main" or branch_to_deploy == "master":
    comandDeploy += branch_to_deploy
else:
    comandDeploy += '{}:main'.format(branch_to_deploy)

print(comandDeploy)
os.system(comandDeploy)