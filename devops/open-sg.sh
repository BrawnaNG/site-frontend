# Update a security group rule allowing your
# current IPv4 I.P. to connect on port 22 (SSH)

# variables to identify sec group and sec group rule
SEC_GROUP_ID='sg-06e6495b14be44e29'
SEC_GROUP_RULE_ID='sgr-0aa0dcc8d63b86930'

# gets current date and prepares description for sec group rule
CURRENT_DATE=$(date +'%Y-%m-%d')
SEC_GROUP_RULE_DESCRIPTION="dynamic ip updated - ${CURRENT_DATE}"

# gets current I.P. and adds /32 for ipv4 cidr
CURRENT_IP=$(curl --silent https://checkip.amazonaws.com)
NEW_IPV4_CIDR="${CURRENT_IP}"/32

# updates I.P. and description in the sec group rule
aws --profile awefilms --region us-east-1 ec2 modify-security-group-rules --group-id ${SEC_GROUP_ID} --security-group-rules SecurityGroupRuleId=${SEC_GROUP_RULE_ID},SecurityGroupRule="{CidrIpv4=${NEW_IPV4_CIDR}, IpProtocol=tcp,FromPort=22,ToPort=22,Description=${SEC_GROUP_RULE_DESCRIPTION}}"

# shows the sec group rule updated
aws ec2 describe-security-group-rules --filter Name="security-group-rule-id",Values="${SEC_GROUP_RULE_ID}"
