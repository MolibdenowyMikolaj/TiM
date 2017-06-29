package pl.edu.wat.wcy.isi.tim.test;

import android.os.AsyncTask;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

/**
 * Created by Ajron on 2017-06-04.
 */
public class DownloadFromUrlTask extends AsyncTask<String, Integer, String> {
    protected void onPreExecute(){}

    protected String doInBackground(String... webPage){
        String result = null;
        try {
            URL url = new URL(webPage[0]);
            URLConnection urlConnection = url.openConnection();
            urlConnection.setRequestProperty ("Authorization", TestLogingActivity.text2);
            InputStream is = urlConnection.getInputStream();
            InputStreamReader isr = new InputStreamReader(is);

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