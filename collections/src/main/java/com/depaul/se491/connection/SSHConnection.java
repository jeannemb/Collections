package com.depaul.se491.connection;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

public class SSHConnection {

	private Session session; //represents each ssh session

	public void closeSSH ()
	{
	    session.disconnect();
    	System.out.println("session is connected: " + session.isConnected());
	}

	public SSHConnection () throws Throwable
	{

	    JSch jsch = new JSch();
		session = jsch.getSession("ec2-user", "ec2-52-55-17-59.compute-1.amazonaws.com", 22);
		
		jsch.addIdentity("/Users/mohammadalharbi/Downloads/SSHAccess.pem.txt");
		//jsch.addIdentity("/Users/Jeanne/Documents/SE491/SSHAccess.pem.txt");
		//jsch.addIdentity("/Users/Mark/Documents/SSHAccess.pem.txt");
		//jsch.addIdentity("files/SSHAccess.pem.txt");
		
		String rhost = "se491-mysql-collections.cwxyxwc6zgxm.us-east-1.rds.amazonaws.com";
		int rport = 3306;
        int lport = 8040;
        session.setConfig("StrictHostKeyChecking", "no");
        	System.out.println("Establishing Connection...");
        session.connect();
        	System.out.println(session.isConnected());
        session.setPortForwardingL(lport, rhost, rport);
	}
}
