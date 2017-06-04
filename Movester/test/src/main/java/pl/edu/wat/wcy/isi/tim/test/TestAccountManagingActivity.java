package pl.edu.wat.wcy.isi.tim.test;

import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import org.json.JSONObject;

import java.util.concurrent.ExecutionException;

/**
 * Created by Ajron on 2017-05-21.
 */
public class TestAccountManagingActivity extends ActionBarActivity {
    String web = "http://localhost:port/user/data?id=0"; // JEST ZAINICJOWANA ZMIENNA GLOBALNA, ALE DO TESTOW ZMIENIAMY RECZNIE

    String jsonString = null;
    JSONObject json = null;

    String text1 = null;
    String text2 = null;
    String text3 = null;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_account_managing);
    }

    public void onStartMeasuringClick(View view) throws ExecutionException, InterruptedException {
        AsyncTask<String, Integer, String> task = new DownloadFromUrlTask();
        task.execute(web);
        jsonString = task.get();

        json = toJson(jsonString);
/* KOD JEST DOBRY, ALE MUSI BYC DOBRY String web WPROWADZONY, ZEBY NIE WYKRZACZAC, DLATEGO W KOMENTARZU!
        text1 = json.optString("id_user");
        text2 = json.optString("login");
        text3 = json.optString("password");
*/
        TextView textView1 = (TextView) findViewById(R.id.textView19);
        textView1.setText(text1, TextView.BufferType.EDITABLE);

        TextView textView2 = (TextView) findViewById(R.id.textView20);
        textView2.setText(text2, TextView.BufferType.EDITABLE);

        TextView textView3 = (TextView) findViewById(R.id.textView21);
        textView3.setText(text3, TextView.BufferType.EDITABLE);
    }

    public void onLogOutClick(View view) {
    }

    private JSONObject toJson(String string) {
        JSONObject obj = null;
        try {
            obj = new JSONObject(string);
            Log.d("My App", obj.toString());
        } catch (Throwable t) {}
        return obj;
    }
}
