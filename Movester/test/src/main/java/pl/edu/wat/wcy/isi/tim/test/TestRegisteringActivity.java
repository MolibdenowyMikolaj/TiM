package pl.edu.wat.wcy.isi.tim.test;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import org.json.JSONObject;

import static pl.edu.wat.wcy.isi.tim.test.R.layout;

/**
 * Created by Ajron on 2017-05-21.
 */
public class TestRegisteringActivity extends ActionBarActivity {

    String jsonString = null;
    JSONObject json = null;
    String web = "http://www.google.com";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(layout.activity_test_registering);
    }

    public void onRegisterClick(View view) {
        new DownloadFromUrlTask().execute(web);

        json = toJson(jsonString);

        if (jsonString == null) {
            EditText editText = (EditText) findViewById(R.id.editText);
            editText.setText("null :(", TextView.BufferType.EDITABLE);
        } else {
        EditText editText = (EditText) findViewById(R.id.editText);
        editText.setText(jsonString, TextView.BufferType.EDITABLE);
        }
    }

    private JSONObject toJson(String string) {
        JSONObject obj = null;
        try {
            obj = new JSONObject(string);
            Log.d("My App", obj.toString());
        } catch (Throwable t) {
            Log.e("My App", "Could not parse malformed JSON: \"" + string + "\"");
        }
        return obj;
    }
    /*
    private String getHtml(String Url) {
        String whole = null;
        try {
            URL url = new URL(Url);
            InputStream is = url.openStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(is));

            String line;
            while ( (line = br.readLine()) != null) {
                whole = whole + line;
                System.out.print(line);
            }

            br.close();
            is.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return whole;
    }
    */
    /*
    private String getHtml(String webPage) {
        String result = null;
        try {
            URL url = new URL(webPage);
            URLConnection urlConnection = url.openConnection();
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
    */
}
