package pl.edu.wat.wcy.isi.tim.test;

import android.os.AsyncTask;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * Created by Ajron on 2017-06-24.
 */
public class UploadTask extends AsyncTask<String, Integer, String> {
    protected void onPreExecute(){}

    protected String doInBackground(String... webPage){
        String result = null;
        try {

            String urlParameters  = webPage[2];
            byte[] postData       = urlParameters.getBytes( StandardCharsets.UTF_8 );
            int    postDataLength = postData.length;
            String request        = webPage[0] + webPage[1];
            URL    url            = new URL( request );
            HttpURLConnection conn= (HttpURLConnection) url.openConnection();
            conn.setRequestProperty ("Authorization", TestLogingActivity.text2);
            conn.setDoOutput( true );
            conn.setInstanceFollowRedirects( false );
            conn.setRequestMethod( "POST" );
            conn.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty( "charset", "utf-8");
            conn.setRequestProperty( "Content-Length", Integer.toString( postDataLength ));
            conn.setUseCaches( false );
            try( DataOutputStream wr = new DataOutputStream( conn.getOutputStream())) {
                wr.write( postData );
            }
            InputStreamReader isr = new InputStreamReader(conn.getInputStream());

            int numCharsRead;
            char[] charArray = new char[1024];
            StringBuffer sb = new StringBuffer();
            while ((numCharsRead = isr.read(charArray)) > 0) {
                sb.append(charArray, 0, numCharsRead);
            }
            result = sb.toString();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    protected void onProgressUpdate(Integer number){}

    protected void onPostExecute(String string){}
}